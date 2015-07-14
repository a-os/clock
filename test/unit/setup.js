'use strict';

requireApp('clock/test/unit/mocks/mock_moz_alarm.js');
require('/shared/test/unit/load_body_html_helper.js');

requireApp('clock/js/alameda.js', () => {
  this.require = requirejs.config({
    baseUrl: '/js',
    paths: {
      shared: '../shared',
      mocks: '../test/unit/mocks'
    },
    urlArgs: 'cache_bust=' + Date.now(),
    map: {
      '*': {
        'l10n': 'mocks/mock_moz_l10n'
      }
    },
    shim: {
      'shared/template': {/template': {
        exports: 'Template'
      },
      'shared/gesture_detector': {/gesture_detector': {
        exports: 'GestureDetector'
      },
      'shared/accessibility_helper': {/accessibility_helper': {
        exports: 'AccessibilityHelper'
      },
      'shared/async_storage': {/async_storage': {
        exports: 'asyncStorage'
      },
      'shared/l10n_date': ['shared/js/l10n']/l10n_date': ['shared/js/l10n']
    }
  });
});
