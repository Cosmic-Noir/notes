// Vue Framework - also uses a Virtual DOM like React - creates a virutal DOM out of javascript and compares to see what has changed. Using javascirpt objects is much faster. Stored in memory.

// Can be added to your project by including this script tag in the <head> of project: - Note the defer tag is used to make sure the page is laoded before loading Vue

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" defer></script>

// To start using Vue, you must first export a class called Vue

const app = new Vue({});

// The Vue({}) takes only one arguement called the 'options object'. Every arg Vue needs is added to this object as key/value pair.

// With Vue, we have to specificy which part of our app has access to the Vue features. You do this by using the `el` key, and specify using CSS selectors the element.

const app = new Vue({
  el: '#app'
});

// After this, we import the JavaScript file into the HTML file to allow Vue app to find the specified HTML element and turn it into a Vue app:
// Note that the script tag that is importing the app.js file is BENEATH the CDN that imports Vue and is also deferred, which is necessary

// index.html :
<>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" defer></script>
    <script src="./js/app.js" defer></script>
  </head>
  <body>
    <div id="app">
       {/* Vue App HTML Code */}
    </div>
  </body>
</>

// Now that the HTML has loaded the CDN Vue package, and we have imported the file which will actually hold the Vue app, we can go to the app.js file that is being imported and actually create the app like we did above:

const app = new Vue({
  el: '#app'
});

// All dynamic data needs to be provided to the Vue app via the key 'data'

const app = new Vue({
  el: '#app',
  data: {
    username: 'Ted'
  }
});

// Now that we have data to be displayed, we need a place (syntax) for displaying that info
// Templates - Vue uses "templating" to specify certain content in the HTML that is dynically provided by the Vue App's Data options object. You use double curliles to speicify this dynamic content:

<div id="app">
  <h2>Hello, {{ username }}</h2>
</div>

// Directives - custom HTML attributes built into Vue that handle common, complex front-end operations. One example is the `v-if` directive, which handles logic around conditonally displaying elements. The below example will check the data.userIsLoggedIn value, Ex:

<button v-if="userIsLoggedIn">Log Out</button>
<button v-if="!userIsLoggedIn">Log In</button>

// Another common directive is `v-for`, where you an iterate over array elements. The below example will look at data.todoList array:

<ul>
  <li v-for="todo in todoList" >{{ todo }}</li>
</ul>

// v-model - This is used for form fields, it hooks directly to the associated data field specified and updates the data value when the input value is also updated.

<input v-model="username" />

// Here is Vue's documentation on a full list of all directives: https://vuejs.org/v2/api/#Directives

// If you can't find a directive that does what you want, you can also make your own.

// You can also use v-if to display something if the value actually exists as well:

<div class="user-bio" v-if="bio">
  <em>Bio: </em> {{ bio }}
</div>

// v-on:click - Takes JavaScript code as the value - You can literally just push values to array values like so:

<input type="text" value="tweet" placeholder="New Tweet" v-model="newTweet" />
<button v-on:click="tweets.push(newTweet)">Add Tweet</button>

// Components - custom, reusable elements. When creating a component, you provide a Template. You also specify props, which a component can use to fill the template. Example of a Vue component that takes a message and username props, where the template is just a small snippet of code.

const Tweet = Vue.component('tweet', {
  props: ['message', 'author'],
  template: '<div class="tweet"><h3>{{ author }}</h3><p>{{ message }}</p></div>'
 });

 // v-bind - takes a value from the app's data object and uses it as the value of the specified component prop?

 <div class="tweets">
 <tweet v-for="tweet in tweets"
        v-bind:message="tweet"></tweet>
</div>

// Vue Data

// computed - this section of the Vue options contains data values that can be calculated.

const app = new Vue({
  el: '#app',
  data: {
    hoursStudied: 275
  },
  computed: {
    languageLevel: function() {
      if (this.hoursStudied < 100) {
        return 'Beginner';
      } else if (this.hoursStudied < 1000) {
        return 'Intermediate';
      } else {
        return 'Expert';
      }
    }
  }
})


// You can then call the computed data the same way as the normal data:

<div id="app">
  <p>You have studied for {{ hoursStudied }} hours. You have {{ languageLevel }}-level mastery.</p>
</div>


// Computed Property Setters - You can have computed values contain a get and set method with a value that is a function.
// The get function returns a cmoputed value based on the data values
// While the setter alows us to set the value of the data.

const app = new Vue({
  el: '#app',
  data: {
    hoursStudied: 274
  },
  computed: {
    languageLevel: {
      get: function() {
        if (this.hoursStudied < 100) {
          return 'Beginner';
        } else if (this.hoursStudied < 1000) {
          return 'Intermediate';
        } else {
          return 'Expert';
        }
      },
      set: function(newLanguageLevel) {
        if (newLanguageLevel === 'Beginner') {
          this.hoursStudied = 0;
        } else if (newLanguageLevel === 'Intermediate') {
          this.hoursStudied = 100;
        } else if (newLanguageLevel === 'Expert') {
          this.hoursStudied = 1000;
        }
      }
    }
  }
});

<div id=“app”>
  <p>You have studied for {{ hoursStudied }} hours. You have {{ languageLevel }}-level mastery.</p>
  <span>Change Level:</span>
  <select v-model="languageLevel">
    <option>Beginner</option>
    <option>Intermediate</option>
    <option>Expert</option>
  </select>
</div>

// Computed Property Setters - Using Vue we can update data values if a computed value changes, such as when a user makes a change on the front end. You do that by setting `this.dataProperty = "the thing I want";` In the below example, the value of `computed` becomes an object which contains a `get` and `set` key, which contain a function that sets or returns the value of `this.whatever`. Ex:

const app = new Vue({
  el: '#app',
  data: {
    hoursStudied: 274
  },
  computed: {
    languageLevel: {
      get: function() {
        if (this.hoursStudied < 100) {
          return 'Beginner';
        } else if (this.hoursStudied < 1000) {
          return 'Intermediate';
        } else {
          return 'Expert';
        }
      },
      set: function(newLanguageLevel) {
        if (newLanguageLevel === 'Beginner') {
          this.hoursStudied = 0;
        } else if (newLanguageLevel === 'Intermediate') {
          this.hoursStudied = 100;
        } else if (newLanguageLevel === 'Expert') {
          this.hoursStudied = 1000;
        }
      }
    }
  }
});

// Watchers - If you want to make the app update without using a specific `computed` function, you can use watchers. The value of the watch key is an object that contains keys of the data properties you'd like to "watch", while the value is a function that is run when those properties change.

const app = new Vue({
  el: '#app',
  data: {
    currentLanguage: 'Spanish',
    supportedLanguages: ['Spanish', 'Italian', 'Arabic'],
    hoursStudied: 274
  },
  watch: {
    currentLanguage: function (newCurrentLanguage, oldCurrentLanguage) {
      if (supportedLanguages.includes(newCurrentLanguage)) {
        this.hoursStudied = 0;
      } else {
        this.currentLanguage = oldCurrentLanguage;
      }
    }
  }
});

// Methods - there is another key in the component called `methods`, which stores things like helper functions, event handlers, or other functions.

const app = new Vue({
  el: "#app",
  data: {
    hoursStudied: 300
  },
  methods: {
    resetProgress: function () {
      this.hoursStudied = 0;
    }
  }
});

// html ex;

<button v-on:click="resetProgress">Reset Progress</button>

// Vue Forms - v-model - used to autmoatically bind form fields to dynamic values on the Vue app. Note that v-model also works with computed values as well. Ex:

<input type="text" v-model="username" />

const app = new Vue({
  el: '#app',
  data: { username: 'Michael' }
});

// Radio buttons - apparently a special case - In HTML, radio buttons are each their own 'input' field (neat). Because of this, you have to bind each individual radio input to the same v-model value. Ex:

<legend>How was your experience?</legend>

 <input type="radio" id="goodReview" value="good" v-model="experienceReview" />
 <label for="goodReview">Good</label>

 <input type="radio" id="neutralReview" value="neutral" v-model="experienceReview" />
 <label for="neutralReview">Neutral</label>

 <input type="radio" id="badReview" value="bad" v-model="experienceReview" />
 <label for="badReview">Bad</label>

 // js

 const app = new Vue({
  el: '#app',
  data: { experienceReview: '' }
});

// Checkboxes - Because users can select multiple values, the data values must be an array. then you simply add the v-model, again, with the same value and they will added or remove from the value array.

<legend>Which of the following features would you like to see added?</legend>

 <input type="checkbox" id="search-bar" value="search" v-model="requestedFeatures" />
 <label for="search-bar">Search Bar</label>

 <input type="checkbox" id="ads" value="ads" v-model="requestedFeatures" />
 <label for="ads">Ads</label>

 <input type="checkbox" id="new-content" value="content" v-model="requestedFeatures" />
 <label for="new-content">New Content</label>

 // js:
 const app = new Vue({
   el: '#app',
   data: { requestedFeatures: [] }
 });


 // boolean checkboxes - sometimes you have only a single checkbox that must store a true/false value. In this case, if that value of that data is NOT stored in an array, it will autmoatically track this value as a boolean true/false:

 <legend>Would you recommend this site to a friend?</legend>
<input type="checkbox" v-model="wouldRecommend" />

// js:
const app = new Vue({
  el: '#app',
  data: { wouldRecommend: false }
});

// Form Event Handlers - v-on -

<form v-on:reset="resetForm">
  ...
  <button type="reset">Reset</button>
</form>

// js:
const app = new Vue({
  el: '#app',
  methods: { resetForm: function() { ... } }
});

// I guess a common replacement instead of using the v-on syntax, is using the `@` symbol?

<form @reset="resetForm">
  ...
</form>

// Modifiers - Vue gives developers access to event modifiers (like Event.preventDefault() and Event.stopPropagation()). You can add them directly the the defined event handler, the below is calling `preventDefault` when onSubmit handler is called:

<form v-on:submit.prevent="submitForm">
  ...
</form>

/* Input Modifiers - There are 3 modifiers for v-model:
  .number - automatically converts value to a number
  .trim - removes whitespace from beginning and end
  .lazy - only updates the data values when the change events are trigged, such as when you move away from the input, rather than every key stroke */

  // Form Validation -

  // v-bind - You can use this directive to "bind" certain attributes of an element to the values of stored data. The below example "binds" the `disabled` attribute of the button to the `formIsValid` data property of the Vue app:

  <button type="submit" v-bind:disabled="!formIsValid">Submit</button>
const app = new Vue({
  el: '#app',
  computed: {
    formIsValid: function() { ... }
  }
});

// Styling

// Inline styling - You can use dynamic values from the data as values for styles, note that for hyphenated properties, they must be in quotes:

<h2 v-bind:style="{ color: breakingNewsColor, 'font-size': breakingNewsFontSize }">Breaking News</h2>

// js:
const app = new Vue({
  data: {
    breakingNewsColor: 'red',
    breakingNewsFontSize: '32px'
  }
});

// A common pattern is to use a dynamic vue property that generates the style object instead of inlining it. Ex:

<h2 v-bind:style="breakingNewsStyles">Breaking News</h2>

// js:
const app = new Vue({
  data: {
    breakingNewsStyles: {
      color: 'red',
      'font-size': '32px'
    }
  }
});

// Another interesting aspec is that v-bind:style can take an array of computed style objects:

const app = new Vue({
  data: {
    newsHeaderStyles: {
      'font-weight': 'bold',
      color: 'grey'
    },
    breakingNewsStyles: {
      color: 'red'
    }
  }
});

<h2 v-bind:style="[newsHeaderStyles, breakingNewsStyles]">Breaking News</h2>

// Classes - You can dynamically apply classes based on values:

<span v-bind:class="{ unread: hasNotifications }">Notifications</span>

// css
.unread {
  background-color: blue;
}

// js
const app = new Vue({
  data: { notifications: [ ... ] },
  computed: {
    hasNotifications: function() {
      return notifications.length > 0;
    }
  }
}

// v-bind:class also takes an array of args. Sometimes you want to conditionally apply only one classs, while always adding another:

<span v-bind:class="[{ unread: hasNotifications }, menuItemClass]">Notifications</span>

// js
const app = new Vue({
  data: {
    notifications: [ ... ],
    menuItemClass: 'menu-item'
  },
  computed: {
    hasNotifications: function() {
      return notifications.length > 0;
    }
  }
}

