# ABBAdata CSS Selector Finder

Easily find unique CSS selectors using point/click interface on any web page element.

## Installation

Install the Chrome Extension.

## Running

- Navigate to the target web page and click the Selector Finder icon on the toolbar.
  Page navigation will temporarily be disabled (only onClick handlers will be disabled,
  although other ways to navigate off the page may still work)
- Click on page elements and see the unique CSS Selector on the right panel or the
  "Custom Selectors" tab on the bottom panel. Since the Selector Finder tool panels
  may obscure relevant page content, click the arrows on the upper right of the
  panel to move the panel to the opposite side of the page.
- Customize Selection Finding by enabling/disabling usage of IDs, class names, and/or
  tag names. Specific values of those fields can also be filtered out.
- "Seed Min Length", "Optimized Min Length", and "Threshhold" are settings used by
  https://github.com/antonmedv/finder . Please visit that project for details.
- The root element used for selector finding can be modified to something other than
  the document body (:root). Click the "Use As Selector Root" button to make the
  currently selected element the "selector root". When the root element is changed,
  only child elements of the new root will be selectable.
- Use the "Test Selector" tab to test a user specified CSS selector. The matched
  elements will be highlighted, and the number of matching elements will be displayed.

## Development

### Building

1. Clone this project.
2. npm install
3. npm run build-dev
4. The built files will be created in the <project>/dist directory

### Loading

1. Enable developer extensions in chrome
2. Navigate to chrome://extensions
3. Click the "Developer mode" switch if not already enabled
4. Click "Load unpacked". Select the <project>/dist directory as the extension directory.

### Testing

- npm run test

Uses (https://github.com/antonmedv/finder) .

## Credits

I did not attempt to write a new selector finding library from scratch since there
are already several good ones out there. I chose to use https://github.com/antonmedv/finder
since it works nicely and has the right level of customizability for my needs. Thanks for
creating a very nice library!

## License

MIT

## Changelog

v0.1
Initial release
