/* eslint-env jest */
/**
 * @fileoverview Enforce img tags use alt attribute.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/img-has-alt';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const missingPropError = type => ({
  message: `${type} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.`,
  type: 'JSXOpeningElement',
});

const altValueError = type => ({
  message: `Invalid alt value for ${type}. \
Use alt="" for presentational images.`,
  type: 'JSXOpeningElement',
});

const preferAltError = () => ({
  message: 'Prefer alt="" over role="presentation". First rule of aria is to not use aria if it can be achieved via native HTML.',
  type: 'JSXOpeningElement',
});

const array = [{
  components: ['Thumbnail', 'Image'],
}];


ruleTester.run('img-has-alt', rule, {
  valid: [
    // DEFAULT ELEMENT 'img' TESTS
    { code: '<img alt="foo" />;', parserOptions },
    { code: '<img alt={"foo"} />;', parserOptions },
    { code: '<img alt={alt} />;', parserOptions },
    { code: '<img ALT="foo" />;', parserOptions },
    { code: '<img ALT={`This is the ${alt} text`} />;', parserOptions },
    { code: '<img ALt="foo" />;', parserOptions },
    { code: '<img alt="foo" salt={undefined} />;', parserOptions },
    { code: '<img {...this.props} alt="foo" />', parserOptions },
    { code: '<a />', parserOptions },
    { code: '<img alt={function(e) {} } />', parserOptions },
    { code: '<div alt={function(e) {} } />', parserOptions },
    { code: '<img alt={() => void 0} />', parserOptions },
    { code: '<IMG />', parserOptions },
    { code: '<UX.Layout>test</UX.Layout>', parserOptions },
    { code: '<img alt={alt || "Alt text" } />', parserOptions },
    { code: '<img alt={photo.caption} />;', parserOptions },
    { code: '<img alt={bar()} />;', parserOptions },
    { code: '<img alt={foo.bar || ""} />', parserOptions },
    { code: '<img alt={bar() || ""} />', parserOptions },
    { code: '<img alt={foo.bar() || ""} />', parserOptions },
    { code: '<img alt="" />', parserOptions },
    { code: '<img alt={`${undefined}`} />', parserOptions },
    { code: '<img alt=" " />', parserOptions },
    { code: '<img alt="" role="presentation" />', parserOptions },
    { code: '<img alt="" role={`presentation`} />', parserOptions },
    { code: '<img alt="" role={"presentation"} />', parserOptions },
    { code: '<img alt="this is lit..." role="presentation" />', parserOptions },
    { code: '<img alt={error ? "not working": "working"} />', parserOptions },
    { code: '<img alt={undefined ? "working": "not working"} />', parserOptions },
    { code: '<img alt={plugin.name + " Logo"} />', parserOptions },

    // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
    { code: '<Thumbnail alt="foo" />;', options: array, parserOptions },
    { code: '<Thumbnail alt={"foo"} />;', options: array, parserOptions },
    { code: '<Thumbnail alt={alt} />;', options: array, parserOptions },
    { code: '<Thumbnail ALT="foo" />;', options: array, parserOptions },
    { code: '<Thumbnail ALT={`This is the ${alt} text`} />;', options: array, parserOptions },
    { code: '<Thumbnail ALt="foo" />;', options: array, parserOptions },
    { code: '<Thumbnail alt="foo" salt={undefined} />;', options: array, parserOptions },
    { code: '<Thumbnail {...this.props} alt="foo" />', options: array, parserOptions },
    { code: '<thumbnail />', options: array, parserOptions },
    { code: '<Thumbnail alt={function(e) {} } />', options: array, parserOptions },
    { code: '<div alt={function(e) {} } />', options: array, parserOptions },
    { code: '<Thumbnail alt={() => void 0} />', options: array, parserOptions },
    { code: '<THUMBNAIL />', options: array, parserOptions },
    { code: '<Thumbnail alt={alt || "foo" } />', options: array, parserOptions },
    { code: '<Image alt="foo" />;', options: array, parserOptions },
    { code: '<Image alt={"foo"} />;', options: array, parserOptions },
    { code: '<Image alt={alt} />;', options: array, parserOptions },
    { code: '<Image ALT="foo" />;', options: array, parserOptions },
    { code: '<Image ALT={`This is the ${alt} text`} />;', options: array, parserOptions },
    { code: '<Image ALt="foo" />;', options: array, parserOptions },
    { code: '<Image alt="foo" salt={undefined} />;', options: array, parserOptions },
    { code: '<Image {...this.props} alt="foo" />', options: array, parserOptions },
    { code: '<image />', options: array, parserOptions },
    { code: '<Image alt={function(e) {} } />', options: array, parserOptions },
    { code: '<div alt={function(e) {} } />', options: array, parserOptions },
    { code: '<Image alt={() => void 0} />', options: array, parserOptions },
    { code: '<IMAGE />', options: array, parserOptions },
    { code: '<Image alt={alt || "foo" } />', options: array, parserOptions },
  ],
  invalid: [
    // DEFAULT ELEMENT 'img' TESTS
    { code: '<img />;', errors: [missingPropError('img')], parserOptions },
    { code: '<img alt />;', errors: [altValueError('img')], parserOptions },
    { code: '<img alt={undefined} />;', errors: [altValueError('img')], parserOptions },
    { code: '<img src="xyz" />', errors: [missingPropError('img')], parserOptions },
    { code: '<img role />', errors: [missingPropError('img')], parserOptions },
    { code: '<img {...this.props} />', errors: [missingPropError('img')], parserOptions },
    { code: '<img alt={false || false} />', errors: [altValueError('img')], parserOptions },
    { code: '<img alt={undefined} role="presentation" />;', errors: [altValueError('img')], parserOptions },
    { code: '<img alt role="presentation" />;', errors: [altValueError('img')], parserOptions },
    { code: '<img role="presentation" />;', errors: [preferAltError()], parserOptions },

    // CUSTOM ELEMENT TESTS FOR ARRAY OPTION TESTS
    {
      code: '<Thumbnail />;',
      errors: [missingPropError('Thumbnail')],
      options: array,
      parserOptions,
    },
    {
      code: '<Thumbnail alt />;',
      errors: [altValueError('Thumbnail')],
      options: array,
      parserOptions,
    },
    {
      code: '<Thumbnail alt={undefined} />;',
      errors: [altValueError('Thumbnail')],
      options: array,
      parserOptions,
    },
    {
      code: '<Thumbnail src="xyz" />',
      errors: [missingPropError('Thumbnail')],
      options: array,
      parserOptions,
    },
    {
      code: '<Thumbnail {...this.props} />',
      errors: [missingPropError('Thumbnail')],
      options: array,
      parserOptions,
    },
    { code: '<Image />;', errors: [missingPropError('Image')], options: array, parserOptions },
    { code: '<Image alt />;', errors: [altValueError('Image')], options: array, parserOptions },
    {
      code: '<Image alt={undefined} />;',
      errors: [altValueError('Image')],
      options: array,
      parserOptions,
    },
    {
      code: '<Image src="xyz" />',
      errors: [missingPropError('Image')],
      options: array,
      parserOptions,
    },
    {
      code: '<Image {...this.props} />',
      errors: [missingPropError('Image')],
      options: array,
      parserOptions,
    },
  ],
});