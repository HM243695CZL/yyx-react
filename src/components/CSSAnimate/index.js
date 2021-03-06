import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import cssAnimate, {isCssAnimationSupported} from 'css-animation';
import cx from 'classnames';
import omit from 'object.omit';  // 实现从一个对象中排除某些指定属性并返回最新结果

class CSSAnimate extends PureComponent{
    static defaultProps = {
        component: 'div'
    };
    static propTypes = {
        type: PropTypes.string, // 动画名称
        callback: PropTypes.func, // 动画结束的回调函数
        duration: PropTypes.number, // 动画持续时间
        delay: PropTypes.number, // 动画延时
        component: PropTypes.string // 容器
    };

    componentDidMount() {
        const {type, callback} = this.props;
        this.animate(type, callback);
    }

    componentDidUpdate(prevProps, prevState) {
        const {type, callback} = this.props;
        this.animate(type, callback);
    }

    animate = (type, callback) => {
        const node = ReactDom.findDOMNode(this);
        if(isCssAnimationSupported && type) {
            cssAnimate(node, type, callback);
        } else if(!isCssAnimationSupported){
            console.warn('不支持css动画');
        }
    };

    render() {
        const {
            className,
            children,
            delay,
            duration,
            style,
            component,
            ...otherProps
        } = this.props;
        const Component = component;
        const classnames = cx('animated', className);
        const _style = {...style};
        if(duration) {
            _style.animationDuration = duration + 'ms';
            _style.WebkitAnimationDuration = duration + 'ms';
        }
        if(delay) {
            _style.animationDelay = delay + 'ms';
            _style.WebkitAnimationDelay = delay + 'ms';
        }
        const divProps = omit(otherProps, [
            'type', 'callback', 'delay', 'duration'
        ]);

        return (
            <Component className={classnames} {...divProps} style={_style}>
                {children}
            </Component>
        )
    }

}

export default CSSAnimate;
