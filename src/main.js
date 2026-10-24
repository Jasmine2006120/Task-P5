
import './style.css';

document.querySelector('#app').innerHTML = `

  <!-- NAVIGATION -->
  <nav class="w-full border-t border-black py-4">

    <div class="max-w-6xl mx-auto px-6 flex justify-between items-center">

      <div class="flex gap-6 text-xs">

        <a href="#about" class="hover:text-teal-600 transition">
          ABOUT
        </a>

        <a href="#work" class="hover:text-teal-600 transition">
          WORK
        </a>

        <a href="#gallery" class="hover:text-teal-600 transition">
          GALLERY
        </a>

        <a href="#contact" class="hover:text-teal-600 transition">
          CONTACT
        </a>

      </div>

    </div>

  </nav>


  <!-- HERO -->
  <section class="max-w-5xl mx-auto px-6">

    <div class="relative group overflow-hidden">

      <img
        src="src/assets/deakin.png"
        alt="Deakin University"
        class="w-full h-[300px] object-fit"
      >

      <div
        class="absolute bottom-0 left-0 right-0
               bg-black/60
               text-white
               text-center
               py-2
               text-sm
               opacity-0
               group-hover:opacity-100
               transition duration-300">

        Hey, I'm Jasmine

      </div>

    </div>

  </section>


  <!-- ABOUT -->
  <section id="about" class="max-w-5xl mx-auto px-6 py-12">

    <div class="flex flex-col items-center text-center">

      <img
        src="src/assets/jasmine.jpeg"
        alt="Jasmine"
        class="w-32 h-40 object-cover rounded-full mb-6"
      >

      <p class="text-sm text-teal-600 mb-8">
        I am a full-stack web developer based in Melbourne, Australia.
      </p>

      <div class="w-20 border-t border-teal-600 mb-3"></div>

      <h3 class="text-lg text-teal-600 font-medium">
        Here's what I've done so far
      </h3>

    </div>

  </section>


  <!-- WORK -->
  <section id="work" class="max-w-5xl mx-auto px-6 py-12">

    <div class="flex flex-col gap-8">


      <!-- PROJECT 1 -->
      <div class="group flex items-center gap-6">

        <div
          class="w-60 h-40 flex-shrink-0
                 border border-gray-300
                 rounded-lg
                 overflow-hidden
                 hover:border-teal-600
                 hover:shadow-lg
                 transition duration-300">

          <img
            src="src/assets/p1.png"
            alt="SIT313 Secure Frontend Applications"
            class="w-full h-full object-cover
                   group-hover:scale-105
                   transition duration-300"
          >

        </div>

        <div>

          <h3 class="text-sm font-medium">
            SIT102 HD project
          </h3>

          <p class="text-sm text-gray-600 mt-2">
            A 3D-Dodge game built using Unity-3D game engine
          </p>

        </div>

      </div>


      <!-- PROJECT 2 -->
      <div class="group flex items-center gap-6">

        <div
          class="w-60 h-40 flex-shrink-0
                 border border-gray-300
                 rounded-lg
                 overflow-hidden
                 hover:border-teal-600
                 hover:shadow-lg
                 transition duration-300">

          <img
            src="src/assets/p2.png"
            alt="P1 Personal Website"
            class="w-full h-full object-cover
                   group-hover:scale-105
                   transition duration-300"
          >

        </div>

        <div>

          <h3 class="text-sm font-medium">
            Data Analysis
          </h3>

          <p class="text-sm text-gray-600 mt-2">
            YouTube channels data analysis using python and its libraries.
          </p>

        </div>

      </div>


      <!-- PROJECT 3 -->
      <div class="group flex items-center gap-6">

        <div
          class="w-60 h-40 flex-shrink-0
                 border border-gray-300
                 rounded-lg
                 overflow-hidden
                 hover:border-teal-600
                 hover:shadow-lg
                 transition duration-300">

          <img
            src="src/assets/p3.png"
            alt="Project 3"
            class="w-full h-full object-cover
                   group-hover:scale-105
                   transition duration-300"
          >

        </div>

        <div>

          <h3 class="text-sm font-medium">
            Blinkit-Clone
          </h3>

          <p class="text-sm text-gray-600 mt-2">
            I built the frontend clone of blinkit website usnig HTML and CSS.
          </p>

        </div>

      </div>


      <!-- PROJECT 4 -->
      <div class="group flex items-center gap-6">

        <div
          class="w-60 h-40 flex-shrink-0
                 border border-gray-300
                 rounded-lg
                 overflow-hidden
                 hover:border-teal-600
                 hover:shadow-lg
                 transition duration-300">

          <img
            src="src/assets/p4.png"
            alt="Project 4"
            class="w-full h-full object-cover
                   group-hover:scale-105
                   transition duration-300"
          >

        </div>

        <div>

          <h3 class="text-sm font-medium">
            Spotify-clone
          </h3>

          <p class="text-sm text-gray-600 mt-2">
            I built spotify frontend clione using HTML and CS.
          </p>

        </div>

      </div>

    </div>


    <!-- PHOTOS TITLE -->
    <div class="flex flex-col items-center text-center mt-12">

      <div class="w-20 border-t border-teal-600 mb-3"></div>

      <h3 class="text-lg text-teal-600 font-medium">
        My photos
      </h3>

    </div>

  </section>


  <!-- GALLERY -->
 <section id="gallery" class="max-w-5xl mx-auto px-6 py-12">

  <div
    class="
      columns-1
      sm:columns-2
      md:columns-3
      lg:columns-4
      gap-4
    ">

    <!-- IMAGE 1 -->
    <div class="mb-4 break-inside-avoid">
      <img
        src="src/assets/i1.jpg"
        alt="Gallery image 1"
        class="w-full h-64 object-cover rounded-sm
               hover:opacity-80
               transition duration-300"
      >
    </div>

    <!-- IMAGE 2 -->
    <div class="mb-4 break-inside-avoid">
      <img
        src="src/assets/i2.jpg"
        alt="Gallery image 2"
        class="w-full h-64 object-cover rounded-sm
               hover:opacity-80
               transition duration-300"
      >
    </div>

    <!-- IMAGE 3 -->
    <div class="mb-4 break-inside-avoid">
      <img
        src="src/assets/i3.jpg"
        alt="Gallery image 3"
        class="w-full h-64 object-cover rounded-sm
               hover:opacity-80
               transition duration-300"
      >
    </div>

    <!-- IMAGE 4 -->
    <div class="mb-4 break-inside-avoid">
      <img
        src="src/assets/i4.jpg"
        alt="Gallery image 4"
        class="w-full h-64 object-cover rounded-sm
               hover:opacity-80
               transition duration-300"
      >
    </div>

    <!-- IMAGE 5 -->
    <div class="mb-4 break-inside-avoid">
      <img
        src="src/assets/i5.jpg"
        alt="Gallery image 5"
        class="w-full h-64 object-cover rounded-sm
               hover:opacity-80
               transition duration-300"
      >
    </div>

    <!-- IMAGE 6 -->
    <div class="mb-4 break-inside-avoid">
      <img
        src="src/assets/i6.jpg"
        alt="Gallery image 6"
        class="w-full h-64 object-cover rounded-sm
               hover:opacity-80
               transition duration-300"
      >
    </div>

    <!-- IMAGE 7 -->
    <div class="mb-4 break-inside-avoid">
      <img
        src="src/assets/i7.jpg"
        alt="Gallery image 7"
        class="w-full h-64 object-cover rounded-sm
               hover:opacity-80
               transition duration-300"
      >
    </div>

    <!-- IMAGE 8 -->
    <div class="mb-4 break-inside-avoid">
      <img
        src="src/assets/i8.jpg"
        alt="Gallery image 8"
        class="w-full h-64 object-cover rounded-sm
               hover:opacity-80
               transition duration-300"
      >
    </div>

  </div>

</section>
  <!-- SUBSCRIBE -->
  <section id="subscribe" class="max-w-5xl mx-auto px-6 py-16">

    <div class="max-w-xl mx-auto text-center">

      <div class="w-20 border-t border-teal-600 mb-3 mx-auto"></div>

      <h3 class="text-lg text-teal-600 font-medium mb-3">
        Stay Updated
      </h3>

      <p class="text-sm text-gray-600 mb-6">
        Subscribe to my newsletter and receive a welcome email.
      </p>


      <form
        id="subscribeForm"
        class="flex flex-col sm:flex-row gap-3"
      >

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          class="flex-1 border border-gray-300 rounded-lg px-4 py-3
                 focus:outline-none focus:border-teal-600"
        >


        <button
          type="submit"
          class="bg-teal-600 text-white px-6 py-3 rounded-lg
                 hover:bg-teal-700 transition"
        >
          Subscribe
        </button>

      </form>


      <p
        id="message"
        class="text-sm mt-4"
      ></p>

    </div>

  </section>


  <!-- FOOTER -->
  <footer class="py-10">

    <p class="text-center text-[#168270] font-serif">
      Made with &hearts; by Jasmine
    </p>

  </footer>

`;


// ==========================================
// NEWSLETTER SUBSCRIPTION
// ==========================================

const subscribeForm =
  document.querySelector('#subscribeForm');

const emailInput =
  document.querySelector('#email');

const message =
  document.querySelector('#message');


if (subscribeForm) {

  subscribeForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    if (!emailInput || !message) {
      return;
    }

    const email = emailInput.value.trim();

    message.textContent = 'Subscribing...';


    try {

      const response = await fetch(
        'http://localhost:3000/subscribe',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email: email
          })
        }
      );


      const data = await response.json();


      if (response.ok) {

        message.textContent = data.message;

        emailInput.value = '';

      } else {

        message.textContent =
          data.message || 'Subscription failed.';

      }

    } catch (error) {

      console.error(error);

      message.textContent =
        'Unable to connect to the server.';

    }

  });

}

