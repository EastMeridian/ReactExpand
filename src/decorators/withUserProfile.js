import { connect } from 'react-redux';
import { getUserProfile } from '../redux/user/selectors';

export default connect(getUserProfile);


