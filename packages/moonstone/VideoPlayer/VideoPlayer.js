/**
 * A player for video
 * {@link moonstone/VideoPlayer}.
 *
 * @class VideoPlayer
 * @memberOf moonstone/VideoPlayer
 * @ui
 * @private
 */
import React from 'react';

import Video, {Controls, Play, Mute, Seek, Fullscreen, Time, Overlay} from 'react-html5video';


import IconButton from '../IconButton';
import MarqueeText from '../Marquee/MarqueeText';
import Slider from '../Slider';
import Spinner from '../Spinner';
import Panels from '../Panels';
import Slottable from '@enact/ui/Slottable';

import css from './VideoPlayer.less';

const $L = text => text; // Dummy placeholder


const VideoPlayerBase = class extends React.Component {
	static displayName = VideoPlayerBase;

	static propTypes = {
		infoComponents: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.element), React.PropTypes.element]),
		jumpBy: React.PropTypes.number,
		leftComponents: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.element), React.PropTypes.element]),
		rightComponents: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.element), React.PropTypes.element]),
		title: React.PropTypes.string
	}

	static defaultProps = {
		jumpBy: 100
	}

	constructor (props) {
		super(props);
		this.video = null;
		this.state = {
			percentageLoaded: 0,
			percentagePlayed: 0,
			videoSource: null
		};
	}

	isVideoPresent = () => this.video && this.video.videoEl

	isVideoReady = () => this.video && this.video.videoEl && this.video.videoEl.readyState >= this.video.videoEl.HAVE_ENOUGH_DATA

	// getChildContext = () => {
	// 	return {video: this.video};
	// }

	reloadVideo = () => {
		// When changing a HTML5 video, you have to reload it.
		this.video.load();
		this.video.play();
	}

	send = (action, props) => () => {
		if (this.isVideoReady()) {
			console.log('sending', action, props);
			this.video[action](props);
		}
	}

	jump = (distance) => () => {
		if (this.isVideoReady() && typeof this.video.videoEl.duration === 'number') {
			const el = this.video.videoEl;
			this.video.seek(el.currentTime + distance);
		}
	}

	setVolume = () => {
		this.video.setVolume(this._volumeInput.valueAsNumber);
	}

	onSliderChange = ({value}) => {
		console.log('seeking to:', value);
		this.send('seek', value);
	}

	onProgress = () => {
		if (this.isVideoReady()) {
			const el = this.video.videoEl;
			this.setState({
				percentageLoaded: el.buffered.length && el.buffered.end(el.buffered.length - 1) / el.duration * 100,
				percentagePlayed: el.currentTime / el.duration * 100
			});
		}
	}

	notYetImplemented = ( ) => {
		console.log('Sorry, not yet implemented.');
	}

	render () {
		const {children, title, jumpBy, infoComponents, leftComponents, rightComponents, ...rest} = this.props;
		// if (this.state.videoSource !== children) {
		// 	this.reloadVideo();
		// 	this.setState('videoSource', children);
		// }
					// onLoadedMetadata={this.onLoadedMetadata} // loaded new media
					// onDurationChange={this.onLoadedMetadata} // loaded new media
					// onAbort={this.onFinished} // loaded new media
		return (
			<div className={css.videoPlayer}>
				<Video
					{...rest}
					className={css.videoFrame}
					controls={false}
					ref={video => (this.video = video)}
					onProgress={this.onProgress}
				>
					{children}
					<Overlay>
						<Spinner className={css.spinner}>{$L('Loading')}</Spinner>
					</Overlay>
				</Video>
				<div className={css.fullscreen + ' enyo-fit scrim'} onMouseMove={this.mousemove} onClick={this.videoFSTapped}>
					<div className={css.bottom}> {/* showing={false} */}
						<div className={css.title}> {/* hidingDuration={1000} marqueeOnRender */}
							<MarqueeText className={css.titleText}>{title}</MarqueeText>
							<div className={css.infoComponents}>{infoComponents}</div> {/* showing={false} showingDuration={500} tabIndex={-1} mixins={[ShowingTransitionSupport]} */}
						</div>
						<div className={css.sliderFrame}>
							<Slider
								className={css.mediaSlider}
								backgroundPercent={this.state.percentageLoaded}
								min={0}
								max={100}
								value={this.state.percentagePlayed}
								step={0.001}
								onChange={this.onSliderChange}
							/> {/*
								disabled
								onSeekStart={this.sliderSeekStart}
								onSeek={this.sliderSeek}
								onSeekFinish={this.sliderSeekFinish}
								onEnterTapArea={this.onEnterSlider}
								onLeaveTapArea={this.onLeaveSlider}
								rtl={false}
							*/}
						</div>
						<div className={css.controlsFrame} onClick={this.resetAutoTimeout}>
							<div className={css.leftComponents + ' ' + css.moonHspacing}>{leftComponents}</div>
							<div className={css.rightComponents + ' ' + css.moonHspacing}>
								{rightComponents}
								<IconButton backgroundOpacity="translucent" className={css.moreButton} onClick={this.notYetImplemented}>ellipsis</IconButton>
							</div>
							<div className={css.controlsFrameCenter}>
								{/* <Panels index={0} className={css.controlsContainer}>*/}
								<div className={css.controlsContainer}>
									<div>
										<div className={css.controlButtons}> {/* rtl={false} */}
											<IconButton backgroundOpacity="translucent" onClick={this.send('seek', 0)}>skipbackward</IconButton>
											<IconButton backgroundOpacity="translucent" onClick={this.jump(-1 * jumpBy)}>backward</IconButton>
											<IconButton backgroundOpacity="translucent" onClick={this.send('togglePlay')}>play</IconButton>
											<IconButton backgroundOpacity="translucent" onClick={this.jump(jumpBy)}>forward</IconButton>
											<IconButton backgroundOpacity="translucent" onClick={this.send('seek', (this.video ? this.video.videoEl.duration : 0))}>skipforward</IconButton>
										</div>
									</div>
									<div className={css.moreControls} /> {/* rtl={false} */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

VideoPlayerBase.contextTypes = {
	video: React.PropTypes.object
};
const VideoPlayer = Slottable({slots: ['infoComponents', 'leftComponents', 'rightComponents']}, VideoPlayerBase);

export default VideoPlayer;
export {VideoPlayer, VideoPlayerBase};
