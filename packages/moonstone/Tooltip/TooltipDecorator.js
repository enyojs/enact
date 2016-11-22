import React, {PropTypes} from 'react';
import {hoc} from '@enact/core';
import ri from '@enact/ui/resolution';
import Portal from '@enact/ui/Portal';
import {isRtlText} from '@enact/i18n';
import css from './TooltipDecorator.less';
import {Tooltip} from './Tooltip';

const TooltipDecorator = hoc( (config, Wrapped) => {
	return class extends React.Component {
		static defaultProps = {
			tooltipPosition: 'auto'
		}

		static propTypes = {
			/**
			 * Message of tooltip
			 *
			 * @type {string}
			 * @default is not exist
			 * @public
			 */
			tooltip: React.PropTypes.string,

			/**
			* Position of the tooltip with respect to the activating control. Valid values are
			* `'above'`, `'above center'`, `'above left'`, `'above right'`, `'below'`, `'below center'`, `'below left'`, `'below right'`,
			* `'left bottom'`, `'left middle'`, `'left top'`, `'right bottom'`, `'right middle'`, `'right top'`, `'auto'`.
			* The values starting with `'left`' and `'right'` place the tooltip on the side
			* (sideways tooltip) with two additional positions available, `'top'` and `'bottom'`, which
			* places the tooltip content toward the top or bottom, with the tooltip pointer
			* middle-aligned to the activator.
			*
			* Note: The sideways tooltip does not automatically switch sides if it gets too close or
			* overlaps with the window bounds, as this may cause undesirable layout implications,
			* covering your other controls.
			*
			* @type {String}
			* @default 'auto'
			* @public
			*/
			tooltipPosition: React.PropTypes.oneOf(['auto', 'above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left bottom', 'left middle', 'left top', 'right bottom', 'right middle', 'right top'])
		}

		constructor (props) {
			super(props);
			this.state = {
				tooltip: '',
				tooltipType: 'below left-arrow',
				tooltipTop: '0',
				tooltipLeft: '0',
				tooltipArrowType: 'corner',
				showing: false
			};
		}

		componentDidMount () {
			this.adjustPosition();
		}

		adjustPosition () {
			const position = this.props.tooltipPosition;
			let tPos; // tooltip position
			let aPos; // arrow position
			let r;
			let arr;
			let rtl = isRtlText(this.props.tooltip);

			if ((arr = position.split(' ')).length == 2) {
				[tPos, aPos] = arr;
			} else if (position == 'above' || position == 'below') {
				tPos = position;
				aPos = 'left';
			} else {
				tPos = 'above';
				aPos = 'left';
			}

			if (rtl) {
				if (tPos == 'above' || tPos == 'below') {
					aPos = aPos == 'left' ? 'right' : 'left';
				} else if (tPos == 'left' || tPos == 'right') {
					tPos = tPos == 'left' ? 'right' : 'left';
				}
			}

			r = this.calcPosition(tPos, aPos);

			if (tPos == 'above' || tPos == 'below') {
				let isCalculate = false;

				if (aPos == 'left' && r.tX + r.tW > window.innerWidth || aPos == 'right' && r.tX < 0) {
					isCalculate = true;
					aPos = aPos == 'left' ? 'right' : 'left';
				}

				if (tPos == 'below' && r.tY + r.tH > window.innerHeight ||  tPos == 'above' && r.tY < 0 ) {
					isCalculate = true;
					tPos = tPos == 'above' ? 'below' : 'above';
				}

				if (isCalculate) {
					r = this.calcPosition(tPos, aPos);
				}
			}
			
			this.setState({
				tooltipType: tPos + ' ' + aPos + "-arrow",
				tooltipTop: ri.unit(r.tY, 'rem'),
				tooltipLeft: ri.unit(r.tX, 'rem'),
				tooltipArrowType: aPos == 'center' || aPos == 'middle' ? 'edge' : 'corner'
			});
		}

		calcPosition (tPos, aPos) {
			const cBound = this.clientRef.getBoundingClientRect(); // clinet bound
			const lBound = this.tooltipRef.labelRef.getBoundingClientRect(); // label bound
			const tooltipMargin = 18; // Distance between Conatiner and Tooltip's Label(This value same as Tooltip Arrow's width).
			const moonstoneMargin = 12; // Both side of margin value in moonstone component.
			let tX, tY; // tooltip position

			switch (tPos) {
				case 'below':
					tX = cBound.left + cBound.width/2;
					tY = cBound.bottom + tooltipMargin;
					
					if (aPos == 'right') {
						tX -= lBound.width;
					} else if (aPos == 'center') {
						tX -= lBound.width/2;
					}
					break;
				case 'above':
					tX = cBound.left + cBound.width/2;
					tY = cBound.top - lBound.height - tooltipMargin;

					if (aPos == 'right') {
						tX -= lBound.width;
					} else if (aPos == 'center') {
						tX -= lBound.width/2;
					}
					break;
				case 'left':
					tX = cBound.left - lBound.width - tooltipMargin + moonstoneMargin;
					tY = cBound.top + cBound.height/2;

					if (aPos == 'top') {
						tY -= lBound.height;
					} else if(aPos == 'middle') {
						tY -= lBound.height/2;
					}
					break;
				case 'right':
					tX = cBound.right + tooltipMargin - moonstoneMargin;
					tY = cBound.top + cBound.height/2;

					if (aPos == 'top') {
						tY -= lBound.height;
					} else if(aPos == 'middle') {
						tY -= lBound.height/2;
					}
					break;
				default:
					tX=0;
					tY=0;
					break;
			}

			return {
				tX: tX,
				tY: tY,
				tW: lBound.width,
				tH: lBound.height
			}
		}

		handleFocus () {
			if (this.props.tooltip && this.props.tooltip.length>0) {
				this.show();
			}
		}

		handleBlur () {
			if (this.props.tooltip && this.props.tooltip.length>0) {
				this.hide();
			}
		}

		show () {
			this.setTimeout(() => {
				this.adjustPosition();
				this.setState({
					showing: true
				});
			}, 500);
		}

		hide () {
			this.clearTimeout();
			this.setState({
				showing: false
			});
		}

		clearTimeout () {
			if (window) {
				window.clearTimeout(this.timer);
			}
			this.timer = null;
		}

		setTimeout (fn, time) {
			this.clearTimeout();
			if (window) {
				this.timer = window.setTimeout(fn, time);
			}
		}

		render () {
			const style = this.props.style;
			const tooltip = this.props.tooltip;
			const props = Object.assign({}, this.props);

			delete props.style;
			delete props.tooltip;
			delete props.tooltipPosition;

			return(
				<div className={css.tooltipDecorator} style={style}>
					<div
						onBlur={this.handleBlur.bind(this)}
						onFocus={this.handleFocus.bind(this)}
						ref={(client) => this.clientRef = client}>
						<Wrapped {...props}/>
					</div>
					<Portal open={true}>
						<Tooltip
							tooltip = {tooltip}
							tooltipType={this.state.tooltipType}
							tooltipTop={this.state.tooltipTop}
							tooltipLeft={this.state.tooltipLeft}
							tooltipArrowType={this.state.tooltipArrowType}
							showing={this.state.showing}
							ref={(tooltip) => this.tooltipRef = tooltip} />
					</Portal>
				</div>
			)
		}
	}
});

export default TooltipDecorator;
export {TooltipDecorator};
