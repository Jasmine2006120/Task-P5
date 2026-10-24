import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import { readFile, writeFile } from 'node:fs/promises';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const sendGridApiKey = process.env.SENDGRID_API_KEY?.trim();
const fromEmail = process.env.FROM_EMAIL?.trim();
const mailingListPath = new URL('./mailing-list.json', import.meta.url);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (sendGridApiKey) {
    sgMail.setApiKey(sendGridApiKey);
} else {
    console.warn('[Setup] SENDGRID_API_KEY is missing. Email sending will not work until configured.');
}

if (!fromEmail) {
    console.warn('[Setup] FROM_EMAIL is missing. Add a verified sender address to .env.');
}

app.use(cors());
app.use(express.json({ limit: '10kb' }));

async function readSubscribers() {
    try {
        const fileContents = await readFile(mailingListPath, 'utf8');
        const parsed = JSON.parse(fileContents);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

async function saveSubscriber(email) {
    const subscribers = await readSubscribers();
    const normalizedEmail = email.toLowerCase();

    if (subscribers.some((subscriber) =>
        typeof subscriber.email === 'string' &&
        subscriber.email.toLowerCase() === normalizedEmail
    )) {
        return false;
    }

    subscribers.push({
        email: normalizedEmail,
        subscribedAt: new Date().toISOString()
    });

    await writeFile(mailingListPath, JSON.stringify(subscribers, null, 2), 'utf8');
    return true;
}

app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        emailServiceConfigured: Boolean(sendGridApiKey && fromEmail)
    });
});

app.post('/subscribe', async (req, res) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';

    // Validate on the server: client-side checks can be bypassed.
    if (!email) {
        return res.status(400).json({ message: 'Please enter your email address.' });
    }

    if (email.length > 254 || !emailPattern.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (!sendGridApiKey || !fromEmail) {
        return res.status(503).json({
            message: 'The email service is not configured yet. Please try again later.'
        });
    }

    try {
        const subscribers = await readSubscribers();
        const normalizedEmail = email.toLowerCase();
        const alreadySubscribed = subscribers.some((subscriber) =>
            typeof subscriber.email === 'string' &&
            subscriber.email.toLowerCase() === normalizedEmail
        );

        if (alreadySubscribed) {
            return res.status(409).json({
                message: 'This email address is already subscribed.'
            });
        }

        const [sendGridResponse] = await sgMail.send({
            to: normalizedEmail,
            from: fromEmail,
            subject: "Welcome to Jasmine's Newsletter!",
            text: "Thank you for subscribing to Jasmine's newsletter. You'll receive updates and new content from me.",
            html: `
                <h1>Welcome!</h1>
                <p>Thank you for subscribing to Jasmine's newsletter.</p>
                <p>You'll receive updates and new content from me.</p>
                <p>— Jasmine</p>
            `
        });

        console.log(`[SendGrid] Email request accepted. Status: ${sendGridResponse.statusCode}`);

        subscribers.push({
            email: normalizedEmail,
            subscribedAt: new Date().toISOString()
        });
        await writeFile(mailingListPath, JSON.stringify(subscribers, null, 2), 'utf8');

        // SendGrid commonly responds with 202 Accepted: the request was accepted for processing.
        return res.status(202).json({
            message: 'Success! Your welcome email has been accepted. Please check your inbox and spam folder.'
        });
    } catch (error) {
        const statusCode = error?.response?.statusCode ?? error?.code ?? 'unknown';
        console.error('[Subscribe] Request failed. Status:', statusCode);
        if (error?.response?.body) {
            console.error('[SendGrid] Error details:', JSON.stringify(error.response.body));
        } else {
            console.error('[Subscribe] Error:', error?.message ?? error);
        }

        if (statusCode === 401 || statusCode === 403) {
            return res.status(502).json({
                message: 'The email service rejected the request. Please contact the site administrator.'
            });
        }

        return res.status(502).json({
            message: 'We could not send your welcome email. Please try again later.'
        });
    }
});

// Unknown endpoint
app.use((_req, res) => {
    res.status(404).json({ message: 'Endpoint not found.' });
});

// Invalid JSON and oversized request bodies
app.use((error, _req, res, next) => {
    if (error instanceof SyntaxError && 'body' in error) {
        return res.status(400).json({ message: 'Request body must contain valid JSON.' });
    }
    if (error?.type === 'entity.too.large') {
        return res.status(413).json({ message: 'Request body is too large.' });
    }
    console.error('[Server] Unexpected error:', error?.message ?? error);
    return res.status(500).json({ message: 'An unexpected server error occurred.' });
});

app.listen(PORT, () => {
    console.log(`Newsletter API listening on http://localhost:${PORT}`);
    console.log(`Email service configured: ${Boolean(sendGridApiKey && fromEmail)}`);
});
