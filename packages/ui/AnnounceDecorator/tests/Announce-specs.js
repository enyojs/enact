import React from 'react';
import {shallow, mount} from 'enzyme';
import Announce from '../Announce';

describe('Announce', () => {

	it('should have an announce method on the component', function () {
		const subject = shallow(
			<Announce />
		);
		const node = subject.instance();

		const expected = 'function';
		const actual = typeof node.announce;

		expect(actual).to.equal(expected);
	});

	it('should update the aria-label with the provided message', function () {
		const message = 'message';
		const subject = mount(
			<Announce />
		);

		const node = subject.instance();
		node.announce(message);

		const expected = message;
		// since we're manually updating the node in Announce, we have to manually check the node here
		const actual = node.alert.getAttribute('aria-label');

		expect(actual).to.equal(expected);
	});

});
