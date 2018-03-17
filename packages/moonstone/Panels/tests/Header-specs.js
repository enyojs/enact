import React from 'react';
import {mount} from 'enzyme';
import Header from '../Header';
import css from '../Header.less';

describe('Header Specs', () => {

	it('should render with title text upper-cased', function () {
		let msg = 'Upper-cased Header';

		const header = mount(
			<Header><title>{msg}</title></Header>
		);

		const expected = msg.toUpperCase();
		const actual = header.find('h1').text();

		expect(actual).to.equal(expected);
	});

	it('should have fullBleed class applied', function () {
		const header = mount(
			<Header fullBleed>
				<title>Header</title>
			</Header>
		);

		const expected = true;
		const actual = header.find('header').hasClass(css.fullBleed);

		expect(actual).to.equal(expected);
	});

	it('should have input when inputMode is true', function () {
		const header = mount(
			<Header inputMode>
				<title>Header</title>
			</Header>
		);

		const expected = 1;
		const actual = header.find('input').length;

		expect(actual).to.equal(expected);
	});

	it('should render with title as placeholder when inputMode is true', function () {
		const header = mount(
			<Header inputMode>
				<title>Header</title>
			</Header>
		);

		const expected = 'Header';
		const actual = header.find('input').prop('placeholder');

		expect(actual).to.equal(expected);
	});
});
