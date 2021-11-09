import React, {useState} from 'react';
import './index.less';
import FormConfig from './form-config/form-config';
import List from './list';
const FormGeneratorComponent = () => {
    const [showList, setShowList] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const hideList = data => {
        setShowList(false);
    };
    const hideFormConfig = () => {
        setShowList(true);
    };
    return (
        <div className='form-generator-container'>
            {
                showList ?
                    <List
                        changeFlag={hideList}
                        refresh={refresh}
                    /> :
                    <FormConfig
                        changeFlag={hideFormConfig}
                    />
            }
        </div>
    )
};
export default FormGeneratorComponent
