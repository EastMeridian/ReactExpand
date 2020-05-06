import { connect } from 'react-redux';
import { getVillages } from '../redux/user/selectors';

export default connect(getVillages);