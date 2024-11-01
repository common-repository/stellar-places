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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/stellar-places-map.js":
/*!**************************************!*\
  !*** ./src/js/stellar-places-map.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($, win, doc, undefined) {
  var app = win.stellarPlaces || {};

  var EventDispatcher = _.extend({}, Backbone.Events);

  app.getCoordinates = function (lat, lng) {
    return new google.maps.LatLng(Number(lat), Number(lng));
  };

  app.models = {
    Place: Backbone.Model.extend({})
  };
  app.collections = {
    Places: Backbone.Collection.extend({
      model: app.models.Place
    })
  };
  app.views = {
    Map: Backbone.View.extend({
      render: function render() {
        var $el = this.$el;
        var width = $el.width();
        var mapOptions = $.parseJSON($el.attr('data-stellar-places-map-options'));
        mapOptions.center = app.getCoordinates($el.attr('data-stellar-places-map-lat'), $el.attr('data-stellar-places-map-lng'));

        if (mapOptions.mapTypeId) {
          mapOptions.mapTypeId = google.maps.MapTypeId[mapOptions.mapTypeId];
        }

        var map = new google.maps.Map(this.el, mapOptions);
        var mapBounds = new google.maps.LatLngBounds();
        $el.data('map', map);
        $el.data('mapBounds', mapBounds);
        var locations = $.parseJSON($el.attr('data-stellar-places-map-locations'));
        this.collection = new app.collections.Places(locations);
        var autoZoom = 'true' === $el.attr('data-stellar-places-map-auto-zoom');
        var autoCenter = 'true' === $el.attr('data-stellar-places-map-auto-center');
        var displayInfoWindows = 'true' === $el.attr('data-stellar-places-map-info-windows');
        this.collection.each(function (model) {
          var position = app.getCoordinates(model.get('latitude'), model.get('longitude'));
          mapBounds.extend(position);
          var markerOptions = {
            map: map,
            title: model.get('name'),
            position: position,
            icon: model.get('icon')
          };

          if (!displayInfoWindows) {
            markerOptions.cursor = 'default';
          }

          var marker = new google.maps.Marker(markerOptions);
          model.set('marker', marker);

          if (displayInfoWindows) {
            var content = _.template($('#stellar-places-info-window-template').html())(model.toJSON());

            marker.infoWindow = new google.maps.InfoWindow({
              content: content,
              maxWidth: width - 140
            });
            google.maps.event.addListener(marker, 'click', function (e) {
              EventDispatcher.trigger('closeAllInfoWindows');
              marker.infoWindow.open(map, marker);
            });
            google.maps.event.addListener(map, 'resize', function () {
              width = $el.width();
              marker.infoWindow.close();
            });
            EventDispatcher.on('closeAllInfoWindows', function () {
              marker.infoWindow.close();
            });
          }
        });
        $el.data('stellarPlacesMapLocations', this.collection.map(function (model) {
          return model.toJSON();
        }));

        if (this.collection.length) {
          if (autoZoom) {
            map.fitBounds(mapBounds);
            map.setCenter(mapBounds.getCenter());
          }

          if (autoCenter) {
            map.panToBounds(mapBounds);
          } else {
            map.setCenter(mapOptions.center);
          }

          google.maps.event.addListener(map, 'resize', function () {
            map.setCenter(mapBounds.getCenter());
          });
        }

        google.maps.event.addDomListener(win, 'resize', function () {
          var center = map.getCenter();
          google.maps.event.trigger(map, 'resize');
          map.setCenter(center);
        });
        return this;
      }
    })
  };

  app.initialize = function () {
    $.each($('.stellar-places-map-canvas'), function () {
      new app.views.Map({
        el: $(this)
      }).render();
    });
  };

  $(doc).ready(function () {
    app.initialize();
  });
})(jQuery, window, document);

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi ./src/js/stellar-places-map.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/stellar-places-map.js */"./src/js/stellar-places-map.js");


/***/ })

/******/ });
//# sourceMappingURL=stellar-places-map.js.map