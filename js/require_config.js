requirejs.config({
  // waitSeconds is set to the default here; the build step rewrites
  // it to 0 in build/require_config.jslike so that we never timeout
  // waiting for modules in production. This is important when the
  // device is under super-low-memory stress, as it may take a while
  // for the device to get around to loading things like Clock's alarm
  // ringing screen, and we absolutely do not want that to time out.
  waitSeconds: 7,
  paths: {
    shared: '../shared'
  },
  shim: {
    'shared/template': {/template': {
      exports: 'Template'
    },
    'shared/gesture_detector': {/gesture_detector': {
      exports: 'GestureDetector'
    },
    'shared/async_storage': {/async_storage': {
      exports: 'asyncStorage'
    },
    'shared/accessibility_helper': {/accessibility_helper': {
      exports: 'AccessibilityHelper'
    },
    'shared/l10n_date': ['shared/js/l10n']/l10n_date': ['shared/js/l10n']
  }
});
