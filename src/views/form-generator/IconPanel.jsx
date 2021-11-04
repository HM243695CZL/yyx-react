import React from 'react';
import {iconList} from './generator/icon-list';
import {uniqueId} from 'lodash';
import './icon-panel.less';
const IconPanel = ({
   chooseIcon
}) => {
    return (
        <div className='icon-panel-container'>
            <ul className="icon-ul">
                {
                    iconList.map(Item => (
                        <li onClick={e => chooseIcon(Item)} key={uniqueId('icon-')}>
                            <Item/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

export default IconPanel
