import classnames from 'classnames/bind';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import React from 'react';
import PropTypes from 'prop-types';
import Spotlight from '@enact/spotlight';
import {SpotlightContainerDecorator, spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import {forward} from '@enact/core/handle';

import $L from '../internal/$L';
import IconButton from '../IconButton';

import {countReactChildren} from './util';

import css from './VideoPlayer.less';

const cn = classnames.bind(css);
const Container = SpotlightContainerDecorator({enterTo: ''}, 'div');
const MediaButton = onlyUpdateForKeys([
	'children',
	'disabled',
	'onClick',
	'spotlightDisabled'
])(IconButton);

const forwardToggleMore = forward('onToggleMore');

/**
 * MediaControls {@link moonstone/VideoPlayer}.
 *
 * @class MediaControls
 * @memberof moonstone/VideoPlayer
 * @ui
 * @public
 */
class MediaControls extends React.Component {
	static propTypes = /** @lends moonstone/VideoPlayer.MediaControls.prototype */ {
		/**
		 * A string which is sent to the `backward` icon of the player controls. This can be
		 * anything that is accepted by {@link moonstone/Icon}.
		 *
		 * @type {String}
		 * @default 'backward'
		 * @public
		 */
		backwardIcon: PropTypes.string,

		/**
		 * A string which is sent to the `forward` icon of the player controls. This can be anything
		 * that is accepted by {@link moonstone/Icon}.
		 *
		 * @type {String}
		 * @default 'forward'
		 * @public
		 */
		forwardIcon: PropTypes.string,

		/**
		 * A string which is sent to the `jumpBackward` icon of the player controls. This can be
		 * anything that is accepted by {@link moonstone/Icon}.
		 *
		 * @type {String}
		 * @default 'skipbackward'
		 * @public
		 */
		jumpBackwardIcon: PropTypes.string,

		/**
		 * Sets the `disabled` state on the media "jump" buttons; the outer pair.
		 *
		 * @type {Boolean}
		 * @public
		 */
		jumpButtonsDisabled: PropTypes.bool,

		/**
		 * A string which is sent to the `jumpForward` icon of the player controls. This can be
		 * anything that is accepted by {@link moonstone/Icon}.
		 *
		 * @type {String}
		 * @default 'skipforward'
		 * @public
		 */
		jumpForwardIcon: PropTypes.string,

		/**
		 * These components are placed below the title. Typically these will be media descriptor
		 * icons, like how many audio channels, what codec the video uses, but can also be a
		 * description for the video or anything else that seems appropriate to provide information
		 * about the video to the user.
		 *
		 * @type {Node}
		 * @public
		 */
		leftComponents: PropTypes.node,

		/**
		 * Sets the `disabled` state on the media buttons.
		 *
		 * @type {Boolean}
		 * @public
		 */
		mediaDisabled: PropTypes.bool,

		/**
		 * The label for the "More" button for when the "More" tray is open.
		 * This will show on the tooltip.
		 *
		 * @type {String}
		 * @default 'Back'
		 * @public
		 */
		moreButtonCloseLabel: PropTypes.string,

		/**
		 * The color of the underline beneath more icon button.
		 *
		 * This property accepts one of the following color names, which correspond with the
		 * colored buttons on a standard remote control: `'red'`, `'green'`, `'yellow'`, `'blue'`
		 *
		 * @type {String}
		 * @see {@link moonstone/IconButton.IconButtonBase.color}
		 * @default 'blue'
		 * @public
		 */
		moreButtonColor: PropTypes.oneOf([null, 'red', 'green', 'yellow', 'blue']),

		/**
		 * Sets the `disabled` state on the media "more" button.
		 *
		 * @type {Boolean}
		 * @public
		 */
		moreButtonDisabled: PropTypes.bool,

		/**
		 * The label for the "More" button. This will show on the tooltip.
		 *
		 * @type {String}
		 * @default 'More'
		 * @public
		 */
		moreButtonLabel: PropTypes.string,

		/**
		 * Removes the "jump" buttons. The buttons that skip forward or backward in the video.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noJumpButtons: PropTypes.bool,

		/**
		 * Removes the "rate" buttons. The buttons that change the playback rate of the video.
		 * Double speed, half speed, reverse 4x speed, etc.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noRateButtons: PropTypes.bool,

		/**
		 * Function executed when the user clicks the Backward button. Is passed
		 * a {@link moonstone/VideoPlayer.videoStatus} as the first argument.
		 *
		 * @type {Function}
		 * @public
		 */
		onBackwardButtonClick: PropTypes.func,

		/**
		 * Function executed when the user clicks the Forward button. Is passed
		 * a {@link moonstone/VideoPlayer.videoStatus} as the first argument.
		 *
		 * @type {Function}
		 * @public
		 */
		onForwardButtonClick: PropTypes.func,

		/**
		 * Function executed when the user clicks the JumpBackward button. Is passed
		 * a {@link moonstone/VideoPlayer.videoStatus} as the first argument.
		 *
		 * @type {Function}
		 * @public
		 */
		onJumpBackwardButtonClick: PropTypes.func,

		/**
		 * Function executed when the user clicks the JumpForward button. Is passed
		 * a {@link moonstone/VideoPlayer.videoStatus} as the first argument.
		 *
		 * @type {Function}
		 * @public
		 */
		onJumpForwardButtonClick: PropTypes.func,

		/**
		 * Function executed when the user clicks the Play button. Is passed
		 * a {@link moonstone/VideoPlayer.videoStatus} as the first argument.
		 *
		 * @type {Function}
		 * @public
		 */
		onPlayButtonClick: PropTypes.func,

		/**
		 * Function executed when the user clicks the More button.
		 *
		 * @type {Function}
		 * @public
		 */
		onToggleMore: PropTypes.func,

		/**
		 * `true` when the video is paused.
		 *
		 * @type {Boolean}
		 * @public
		 */
		paused: PropTypes.bool,

		/**
		 * A string which is sent to the `pause` icon of the player controls. This can be
		 * anything that is accepted by {@link moonstone/Icon}. This will be temporarily replaced by
		 * the [playIcon]{@link moonstone/VideoPlayer.MediaControls.playIcon} when the
		 * [paused]{@link moonstone/VideoPlayer.MediaControls.paused} boolean is `false`.
		 *
		 * @type {String}
		 * @default 'pause'
		 * @public
		 */
		pauseIcon: PropTypes.string,

		/**
		 * A string which is sent to the `play` icon of the player controls. This can be
		 * anything that is accepted by {@link moonstone/Icon}. This will be temporarily replaced by
		 * the [pauseIcon]{@link moonstone/VideoPlayer.MediaControls.pauseIcon} when the
		 * [paused]{@link moonstone/VideoPlayer.MediaControls.paused} boolean is `true`.
		 *
		 * @type {String}
		 * @default 'play'
		 * @public
		 */
		playIcon: PropTypes.string,

		/**
		 * Sets the `disabled` state on the media playback-rate control buttons; the inner pair.
		 *
		 * @type {Boolean}
		 * @public
		 */
		rateButtonsDisabled: PropTypes.bool,

		/**
		 * These components are placed into the slot to the right of the media controls.
		 *
		 * @type {Node}
		 * @public
		 */
		rightComponents: PropTypes.node,

		/**
		 * `true` controls are disabled from Spotlight.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

		/**
		 * The visibility of the component. When `false`, the component will be hidden.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		visible: PropTypes.bool
	}

	static defaultProps = {
		backwardIcon: 'backward',
		forwardIcon: 'forward',
		jumpBackwardIcon: 'skipbackward',
		jumpForwardIcon: 'skipforward',
		moreButtonColor: 'blue',
		pauseIcon: 'pause',
		playIcon: 'play',
		visible: true
	}


	constructor (props) {
		super(props);

		this.mediaControls = null;

		this.state = {
			showMoreComponents: false
		};
	}

	componentDidMount () {
		this.calculateMaxComponentCount(
			countReactChildren(this.props.leftComponents),
			countReactChildren(this.props.rightComponents),
			countReactChildren(this.props.children)
		);
	}

	componentWillReceiveProps (nextProps) {
		// Detect if the number of components has changed
		const leftCount = countReactChildren(nextProps.leftComponents),
			rightCount = countReactChildren(nextProps.rightComponents),
			childrenCount = countReactChildren(nextProps.children);

		if (
			countReactChildren(this.props.leftComponents) !== leftCount ||
			countReactChildren(this.props.rightComponents) !== rightCount ||
			countReactChildren(this.props.children) !== childrenCount
		) {
			this.calculateMaxComponentCount(leftCount, rightCount, childrenCount);
		}

		if (this.props.visible && !nextProps.visible) {
			this.setState(() => {
				return {
					showMoreComponents: false
				};
			});
		}
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.state.showMoreComponents !== prevState.showMoreComponents) {
			forwardToggleMore({showMoreComponents: this.state.showMoreComponents}, this.props);

			// Readout 'more' or 'back' button explicitly.
			let selectedButton = Spotlight.getCurrent();
			selectedButton.blur();
			selectedButton.focus();
		}
	}

	handleMoreClick = () => {
		this.setState((prevState) => {
			return {
				showMoreComponents: !prevState.showMoreComponents
			};
		});
	}

	calculateMaxComponentCount = (leftCount, rightCount, childrenCount) => {
		// If the "more" button is present, automatically add it to the right's count.
		if (childrenCount) {
			rightCount += 1;
		}

		const max = Math.max(leftCount, rightCount);

		this.mediaControls.style.setProperty('--moon-video-player-max-side-components', max);
	}


	getMediaControls = (node) => {
		this.mediaControls = node;
	}

	render () {
		const props = Object.assign({}, this.props);
		const {
			backwardIcon,
			children,
			forwardIcon,
			jumpBackwardIcon,
			jumpButtonsDisabled,
			jumpForwardIcon,
			leftComponents,
			mediaDisabled,
			moreButtonColor,
			moreButtonDisabled,
			noJumpButtons,
			noRateButtons,
			onBackwardButtonClick,
			onForwardButtonClick,
			onJumpBackwardButtonClick,
			onJumpForwardButtonClick,
			onPlayButtonClick,
			paused,
			pauseIcon,
			playIcon,
			rateButtonsDisabled,
			rightComponents,
			spotlightDisabled,
			visible,
			...rest
		} = props;

		delete rest.moreButtonCloseLabel;
		delete rest.moreButtonLabel;
		delete rest.onToggleMore;

		let moreIconLabel, moreIcon;
		if (this.state.showMoreComponents) {
			moreIconLabel = $L('Back');
			moreIcon = 'arrowshrinkleft';
		} else {
			moreIconLabel = $L('More');
			moreIcon = 'ellipsis';
		}

		const className = cn('controlsFrame', {hidden: !visible}, rest.className);
		const centerClassName = cn('centerComponents', {more: this.state.showMoreComponents});

		return (
			<div {...rest} ref={this.getMediaControls} className={className} data-media-controls>
				<div className={css.leftComponents}>{leftComponents}</div>
				<div className={css.centerComponentsContainer}>
					<div className={centerClassName}>
						<Container className={css.mediaControls} spotlightDisabled={this.state.showMoreComponents || spotlightDisabled}>
							{noJumpButtons ? null : <MediaButton aria-label={$L('Previous')} backgroundOpacity="translucent" disabled={mediaDisabled || jumpButtonsDisabled} onClick={onJumpBackwardButtonClick} spotlightDisabled={spotlightDisabled}>{jumpBackwardIcon}</MediaButton>}
							{noRateButtons ? null : <MediaButton aria-label={$L('Rewind')} backgroundOpacity="translucent" disabled={mediaDisabled || rateButtonsDisabled} onClick={onBackwardButtonClick} spotlightDisabled={spotlightDisabled}>{backwardIcon}</MediaButton>}
							<MediaButton aria-label={paused ? $L('Play') : $L('Pause')} className={spotlightDefaultClass} backgroundOpacity="translucent" disabled={mediaDisabled} onClick={onPlayButtonClick} spotlightDisabled={spotlightDisabled}>{paused ? playIcon : pauseIcon}</MediaButton>
							{noRateButtons ? null : <MediaButton aria-label={$L('Fast Forward')} backgroundOpacity="translucent" disabled={mediaDisabled || rateButtonsDisabled} onClick={onForwardButtonClick} spotlightDisabled={spotlightDisabled}>{forwardIcon}</MediaButton>}
							{noJumpButtons ? null : <MediaButton aria-label={$L('Next')} backgroundOpacity="translucent" disabled={mediaDisabled || jumpButtonsDisabled} onClick={onJumpForwardButtonClick} spotlightDisabled={spotlightDisabled}>{jumpForwardIcon}</MediaButton>}
						</Container>
						<Container className={css.moreControls} spotlightDisabled={!this.state.showMoreComponents || spotlightDisabled}>
							{children}
						</Container>
					</div>
				</div>
				<div className={css.rightComponents}>
					{rightComponents}
					{countReactChildren(children) ? (
						<MediaButton
							aria-label={moreIconLabel}
							backgroundOpacity="translucent"
							className={css.moreButton}
							color={moreButtonColor}
							disabled={moreButtonDisabled}
							onTap={this.handleMoreClick}
							tooltipProps={{role: 'dialog'}}
							tooltipText={moreIconLabel}
							spotlightDisabled={spotlightDisabled}
						>
							{moreIcon}
						</MediaButton>
					) : null}
				</div>
			</div>
		);
	}
}

MediaControls.defaultSlot = 'mediaControlsComponent';

export default MediaControls;
export {MediaControls};
