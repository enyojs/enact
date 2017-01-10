import Changeable from '@enact/ui/Changeable';
import React from 'react';
import Slider, {SliderBase} from '@enact/moonstone/Slider';
import {storiesOf, action} from '@kadira/storybook';
import {withKnobs, boolean, number} from '@kadira/storybook-addon-knobs';

const ChangeableSlider = Changeable({mutable: true}, Slider);
ChangeableSlider.propTypes = Object.assign({}, SliderBase.propTypes, Slider.propTypes);
ChangeableSlider.defaultProps = Object.assign({}, SliderBase.defaultProps, Slider.defaultProps);
ChangeableSlider.displayName = 'Slider';

delete ChangeableSlider.propTypes.pressed;
delete ChangeableSlider.defaultProps.pressed;
delete ChangeableSlider.propTypes.defaultPressed;
delete ChangeableSlider.defaultProps.defaultPressed;

storiesOf('Slider')
	.addDecorator(withKnobs)
	.addWithInfo(
		' ',
		'Basic usage of Slider',
		() => (
			<ChangeableSlider
				backgroundPercent={number('backgroundPercent', Slider.defaultProps.backgroundPercent, {range: true, min: 0, max: 100})}
				detachedKnob={boolean('detachedKnob', false)}
				disabled={boolean('disabled', Slider.defaultProps.disabled)}
				max={number('max', Slider.defaultProps.max)}
				min={number('min', Slider.defaultProps.min)}
				onChange={action('onChange')}
				step={number('step', Slider.defaultProps.step)}
				vertical={boolean('vertical', Slider.defaultProps.vertical)}
				value={number('value', Slider.defaultProps.value)}
			/>
		)
	);
