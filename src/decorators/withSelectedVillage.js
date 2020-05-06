import { connect } from 'react-redux';
import { getSelectedVillage } from '../redux/user/selectors';

export default connect(getSelectedVillage);