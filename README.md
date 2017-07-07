# BLZ Input Number Adjuster 1.0
Use the same spinners for input[number] through all browsers

The input appears through all browsers as an `<input type="number">` on Chrome.

Instructions
------------
In order to use *blz-input-number-adjuster* you need AngularJS. 
First of all inject the module `'blz.numinad'` into the module in which you want to use it.
Then you can start using it! Use the tag `<blz-numeric-input></blz-numeric-input>` instead of `<input type="number">` in your template.
This tag accepts 14 arguments:
* `min`: *optional*. Same as `min` of `<input type="number">`, sets the lowest allowed value;
* `max`: *optional*. Same as `max` of `<input type="number">`, sets the highest allowed value;
* `step`: *optional*. Same as `step` of `<input type="number">`, sets the minimum step when a spinner is clicked once;
* `ng-model`: *optional*. Same as `ng-model` of a generic `<input>`;
* `name`: *optional*. Same as `name` of a generic `<input>`;
* `placeholder`: *optional*. Same as `placeholder` of a generic `<input>`;
* `ng-required`: *optional*. Same as `ng-required` of a generic `<input>`;
* `ngminlength`: *optional*. Same as `ng-minlength` of `<input type="number">`;
* `ngmaxlength`: *optional*. Same as `ng-maxlength` of `<input type="number">`;
* `ng-pattern`: *optional*. Same as `ng-pattern` of `<input type="number">`;
* `ng-disabled`: *optional*. Same as `ng-disabled`  of a generic `<input>`;
* `ng-change`: *optional*. Same as `ng-change`  of a generic `<input>`;
* `change-parameter`: *optional*. Parameter to be passed to `ng-change`;
* `blz-class`: *optional*. One or more CSS-classes you want to give to the input;
