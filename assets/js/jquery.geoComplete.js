/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/jquery.geocomplete.js":
/*!**************************************!*\
  !*** ./src/js/jquery.geocomplete.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * jQuery Geocoding and Places Autocomplete Plugin - V 1.5.0
 *
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
// # $.geocomplete()
// ## jQuery Geocoding and Places Autocomplete Plugin - V 1.5.0
//
// * https://github.com/ubilabs/geocomplete/
// * by Martin Kleppe <kleppe@ubilabs.net>
(function ($, window, document, undefined) {
  // ## Options
  // The default options for this plugin.
  //
  // * `map` - Might be a selector, an jQuery object or a DOM element. Default is `false` which shows no map.
  // * `details` - The container that should be populated with data. Defaults to `false` which ignores the setting.
  // * `location` - Location to initialize the map on. Might be an address `string` or an `array` with [latitude, longitude] or a `google.maps.LatLng`object. Default is `false` which shows a blank map.
  // * `bounds` - Whether to snap geocode search to map bounds. Default: `true` if false search globally. Alternatively pass a custom `LatLngBounds object.
  // * `autoselect` - Automatically selects the highlighted item or the first item from the suggestions list on Enter.
  // * `detailsAttribute` - The attribute's name to use as an indicator. Default: `"name"`
  // * `mapOptions` - Options to pass to the `google.maps.Map` constructor. See the full list [here](http://code.google.com/apis/maps/documentation/javascript/reference.html#MapOptions).
  // * `mapOptions.zoom` - The inital zoom level. Default: `14`
  // * `mapOptions.scrollwheel` - Whether to enable the scrollwheel to zoom the map. Default: `false`
  // * `mapOptions.mapTypeId` - The map type. Default: `"roadmap"`
  // * `markerOptions` - The options to pass to the `google.maps.Marker` constructor. See the full list [here](http://code.google.com/apis/maps/documentation/javascript/reference.html#MarkerOptions).
  // * `markerOptions.draggable` - If the marker is draggable. Default: `false`. Set to true to enable dragging.
  // * `markerOptions.disabled` - Do not show marker. Default: `false`. Set to true to disable marker.
  // * `maxZoom` - The maximum zoom level too zoom in after a geocoding response. Default: `16`
  // * `types` - An array containing one or more of the supported types for the places request. Default: `['geocode']` See the full list [here](http://code.google.com/apis/maps/documentation/javascript/places.html#place_search_requests).
  var defaults = {
    bounds: true,
    country: null,
    map: false,
    details: false,
    detailsAttribute: "name",
    autoselect: true,
    location: false,
    mapOptions: {
      zoom: 14,
      scrollwheel: false,
      mapTypeId: "roadmap"
    },
    markerOptions: {
      draggable: false
    },
    maxZoom: 16,
    types: ['geocode'],
    blur: false
  }; // See: [Geocoding Types](https://developers.google.com/maps/documentation/geocoding/#Types)
  // on Google Developers.

  var componentTypes = ("street_address route intersection political " + "country administrative_area_level_1 administrative_area_level_2 " + "administrative_area_level_3 colloquial_area locality sublocality " + "neighborhood premise subpremise postal_code natural_feature airport " + "park point_of_interest post_box street_number floor room " + "lat lng viewport location " + "formatted_address location_type bounds").split(" "); // See: [Places Details Responses](https://developers.google.com/maps/documentation/javascript/places#place_details_responses)
  // on Google Developers.

  var placesDetails = ("id url website vicinity reference name rating " + "international_phone_number icon formatted_phone_number").split(" "); // The actual plugin constructor.

  function GeoComplete(input, options) {
    this.options = $.extend(true, {}, defaults, options);
    this.input = input;
    this.$input = $(input);
    this._defaults = defaults;
    this._name = 'geocomplete';
    this.init();
  } // Initialize all parts of the plugin.


  $.extend(GeoComplete.prototype, {
    init: function init() {
      this.initMap();
      this.initMarker();
      this.initGeocoder();
      this.initDetails();
      this.initLocation();
    },
    // Initialize the map but only if the option `map` was set.
    // This will create a `map` within the given container
    // using the provided `mapOptions` or link to the existing map instance.
    initMap: function initMap() {
      if (!this.options.map) {
        return;
      }

      if (typeof this.options.map.setCenter == "function") {
        this.map = this.options.map;
        return;
      }

      this.map = new google.maps.Map($(this.options.map)[0], this.options.mapOptions); // add click event listener on the map

      google.maps.event.addListener(this.map, 'click', $.proxy(this.mapClicked, this));
      google.maps.event.addListener(this.map, 'zoom_changed', $.proxy(this.mapZoomed, this));
    },
    // Add a marker with the provided `markerOptions` but only
    // if the option was set. Additionally it listens for the `dragend` event
    // to notify the plugin about changes.
    initMarker: function initMarker() {
      if (!this.map) {
        return;
      }

      var options = $.extend(this.options.markerOptions, {
        map: this.map
      });

      if (options.disabled) {
        return;
      }

      this.marker = new google.maps.Marker(options);
      google.maps.event.addListener(this.marker, 'dragend', $.proxy(this.markerDragged, this));
    },
    // Associate the input with the autocompleter and create a geocoder
    // to fall back when the autocompleter does not return a value.
    initGeocoder: function initGeocoder() {
      var options = {
        types: this.options.types,
        bounds: this.options.bounds === true ? null : this.options.bounds,
        componentRestrictions: this.options.componentRestrictions
      };

      if (this.options.country) {
        options.componentRestrictions = {
          country: this.options.country
        };
      }

      this.autocomplete = new google.maps.places.Autocomplete(this.input, options);
      this.geocoder = new google.maps.Geocoder(); // Bind autocomplete to map bounds but only if there is a map
      // and `options.bindToMap` is set to true.

      if (this.map && this.options.bounds === true) {
        this.autocomplete.bindTo('bounds', this.map);
      } // Watch `place_changed` events on the autocomplete input field.


      google.maps.event.addListener(this.autocomplete, 'place_changed', $.proxy(this.placeChanged, this)); // Prevent parent form from being submitted if user hit enter.

      this.$input.keypress(function (event) {
        if (event.keyCode === 13) {
          return false;
        }
      }); // Listen for "geocode" events and trigger find action.

      this.$input.bind("geocode", $.proxy(function () {
        this.find();
      }, this)); // Trigger find action when input element is blured out.
      // (Usefull for typing partial location and tabing to the next field
      // or clicking somewhere else.)

      if (this.options.blur === true) {
        this.$input.blur($.proxy(function () {
          this.find();
        }, this));
      }
    },
    // Prepare a given DOM structure to be populated when we got some data.
    // This will cycle through the list of component types and map the
    // corresponding elements.
    initDetails: function initDetails() {
      if (!this.options.details) {
        return;
      }

      var $details = $(this.options.details),
          attribute = this.options.detailsAttribute,
          details = {};

      function setDetail(value) {
        details[value] = $details.find("[" + attribute + "=" + value + "]");
      }

      $.each(componentTypes, function (index, key) {
        setDetail(key);
        setDetail(key + "_short");
      });
      $.each(placesDetails, function (index, key) {
        setDetail(key);
      });
      this.$details = $details;
      this.details = details;
    },
    // Set the initial location of the plugin if the `location` options was set.
    // This method will care about converting the value into the right format.
    initLocation: function initLocation() {
      var location = this.options.location,
          latLng;

      if (!location) {
        return;
      }

      if (typeof location == 'string') {
        this.find(location);
        return;
      }

      if (location instanceof Array) {
        latLng = new google.maps.LatLng(location[0], location[1]);
      }

      if (location instanceof google.maps.LatLng) {
        latLng = location;
      }

      if (latLng) {
        if (this.map) {
          this.map.setCenter(latLng);
        }

        if (this.marker) {
          this.marker.setPosition(latLng);
        }
      }
    },
    // Look up a given address. If no `address` was specified it uses
    // the current value of the input.
    find: function find(address) {
      this.geocode({
        address: address || this.$input.val()
      });
    },
    // Requests details about a given location.
    // Additionally it will bias the requests to the provided bounds.
    geocode: function geocode(request) {
      if (this.options.bounds && !request.bounds) {
        if (this.options.bounds === true) {
          request.bounds = this.map && this.map.getBounds();
        } else {
          request.bounds = this.options.bounds;
        }
      }

      if (this.options.country) {
        request.region = this.options.country;
      }

      this.geocoder.geocode(request, $.proxy(this.handleGeocode, this));
    },
    // Get the selected result. If no result is selected on the list, then get
    // the first result from the list.
    selectFirstResult: function selectFirstResult() {
      //$(".pac-container").hide();
      var selected = ''; // Check if any result is selected.

      if ($(".pac-item-selected")['0']) {
        selected = '-selected';
      } // Get the first suggestion's text.


      var $span1 = $(".pac-container .pac-item" + selected + ":first span:nth-child(2)").text();
      var $span2 = $(".pac-container .pac-item" + selected + ":first span:nth-child(3)").text(); // Adds the additional information, if available.

      var firstResult = $span1;

      if ($span2) {
        firstResult += " - " + $span2;
      }

      this.$input.val(firstResult);
      return firstResult;
    },
    // Handles the geocode response. If more than one results was found
    // it triggers the "geocode:multiple" events. If there was an error
    // the "geocode:error" event is fired.
    handleGeocode: function handleGeocode(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var result = results[0];
        this.$input.val(result.formatted_address);
        this.update(result);

        if (results.length > 1) {
          this.trigger("geocode:multiple", results);
        }
      } else {
        this.trigger("geocode:error", status);
      }
    },
    // Triggers a given `event` with optional `arguments` on the input.
    trigger: function trigger(event, argument) {
      this.$input.trigger(event, [argument]);
    },
    // Set the map to a new center by passing a `geometry`.
    // If the geometry has a viewport, the map zooms out to fit the bounds.
    // Additionally it updates the marker position.
    center: function center(geometry) {
      if (geometry.viewport) {
        this.map.fitBounds(geometry.viewport);

        if (this.map.getZoom() > this.options.maxZoom) {
          this.map.setZoom(this.options.maxZoom);
        }
      } else {
        this.map.setZoom(this.options.maxZoom);
        this.map.setCenter(geometry.location);
      }

      if (this.marker) {
        this.marker.setPosition(geometry.location);
        this.marker.setAnimation(this.options.markerOptions.animation);
      }
    },
    // Update the elements based on a single places or geoocoding response
    // and trigger the "geocode:result" event on the input.
    update: function update(result) {
      if (this.map) {
        this.center(result.geometry);
      }

      if (this.$details) {
        this.fillDetails(result);
      }

      this.trigger("geocode:result", result);
    },
    // Populate the provided elements with new `result` data.
    // This will lookup all elements that has an attribute with the given
    // component type.
    fillDetails: function fillDetails(result) {
      var data = {},
          geometry = result.geometry,
          viewport = geometry.viewport,
          bounds = geometry.bounds; // Create a simplified version of the address components.

      $.each(result.address_components, function (index, object) {
        var name = object.types[0];
        data[name] = object.long_name;
        data[name + "_short"] = object.short_name;
      }); // Add properties of the places details.

      $.each(placesDetails, function (index, key) {
        data[key] = result[key];
      }); // Add infos about the address and geometry.

      $.extend(data, {
        formatted_address: result.formatted_address,
        street_address: [data.street_number, data.route].filter(function (val) {
          return 'string' === typeof val;
        }).join(' '),
        location_type: geometry.location_type || "PLACES",
        viewport: viewport,
        bounds: bounds,
        location: geometry.location,
        lat: geometry.location.lat(),
        lng: geometry.location.lng()
      }); // Set the values for all details.

      $.each(this.details, $.proxy(function (key, $detail) {
        var value = data[key];
        this.setDetail($detail, value);
      }, this));
      this.data = data;
    },
    // Assign a given `value` to a single `$element`.
    // If the element is an input, the value is set, otherwise it updates
    // the text content.
    setDetail: function setDetail($element, value) {
      if (value === undefined) {
        value = "";
      } else if (typeof value.toUrlValue == "function") {
        value = value.toUrlValue();
      }

      if ($element.is(":input")) {
        $element.val(value);
      } else {
        $element.text(value);
      }
    },
    // Fire the "geocode:dragged" event and pass the new position.
    markerDragged: function markerDragged(event) {
      this.trigger("geocode:dragged", event.latLng);
    },
    mapClicked: function mapClicked(event) {
      this.trigger("geocode:click", event.latLng);
    },
    mapZoomed: function mapZoomed(event) {
      this.trigger("geocode:zoom", this.map.getZoom());
    },
    // Restore the old position of the marker to the last now location.
    resetMarker: function resetMarker() {
      this.marker.setPosition(this.data.location);
      this.setDetail(this.details.lat, this.data.location.lat());
      this.setDetail(this.details.lng, this.data.location.lng());
    },
    // Update the plugin after the user has selected an autocomplete entry.
    // If the place has no geometry it passes it to the geocoder.
    placeChanged: function placeChanged() {
      var place = this.autocomplete.getPlace();

      if (!place || !place.geometry) {
        if (this.options.autoselect) {
          // Automatically selects the highlighted item or the first item from the
          // suggestions list.
          var autoSelection = this.selectFirstResult();
          this.find(autoSelection);
        }
      } else {
        // Use the input text if it already gives geometry.
        this.update(place);
      }
    }
  }); // A plugin wrapper around the constructor.
  // Pass `options` with all settings that are different from the default.
  // The attribute is used to prevent multiple instantiations of the plugin.

  $.fn.geocomplete = function (options) {
    var attribute = 'plugin_geocomplete'; // If you call `.geocomplete()` with a string as the first parameter
    // it returns the corresponding property or calls the method with the
    // following arguments.

    if (typeof options == "string") {
      var instance = $(this).data(attribute) || $(this).geocomplete().data(attribute),
          prop = instance[options];

      if (typeof prop == "function") {
        prop.apply(instance, Array.prototype.slice.call(arguments, 1));
        return $(this);
      } else {
        if (arguments.length == 2) {
          prop = arguments[1];
        }

        return prop;
      }
    } else {
      return this.each(function () {
        // Prevent against multiple instantiations.
        var instance = $.data(this, attribute);

        if (!instance) {
          instance = new GeoComplete(this, options);
          $.data(this, attribute, instance);
        }
      });
    }
  };
})(jQuery, window, document);

/***/ }),

/***/ 1:
/*!********************************************!*\
  !*** multi ./src/js/jquery.geocomplete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/jquery.geocomplete.js */"./src/js/jquery.geocomplete.js");


/***/ })

/******/ });
//# sourceMappingURL=jquery.geoComplete.js.map