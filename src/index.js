import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import LoadingScreen from './components/LoadingScreen';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faEnvelope,
    faUnlockAlt,
    faSignature,
    faClipboardList,
    faSearchLocation,
    faPencilAlt,
    faBug,
    faCamera,
    faMapMarkerAlt,
    faMoneyBillAlt,
    faTrashAlt,
    faCaretSquareLeft,
    faCaretSquareRight,
    faCheckCircle,
    faTimesCircle,
    faInfoCircle,
    faTimes,
    faQuestion,
    faEllipsisV
} from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-regular-svg-icons'

library.add( fab, faEnvelope, faUnlockAlt, faSignature, faBuilding, faClipboardList, faSearchLocation, faPencilAlt, faBug, faCamera, faMapMarkerAlt, faMoneyBillAlt, faTrashAlt, faCaretSquareLeft, faCaretSquareRight, faCheckCircle, faTimesCircle, faInfoCircle, faTimes, faQuestion, faEllipsisV )

ReactDOM.render(
    <Provider store={store.store}>
        <PersistGate persistor={store.persistor} loading={ <LoadingScreen /> }>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>
, document.getElementById('root'));