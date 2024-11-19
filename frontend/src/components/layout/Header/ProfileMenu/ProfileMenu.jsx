import './ProfileMenu.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HistoryIcon from '@mui/icons-material/History';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { TreeItem, TreeView } from '@material-ui/lab'
import { Link } from 'react-router-dom'

const ProfileMenu = ({ setShowNavbarSidebar, user }) => {
    return (
        <div className='navbar-sidebar' onMouseLeave={e => setShowNavbarSidebar(false)}>
            <div className='navbar-sidebar-user'>
                <img src={user.avatar.url} alt={user.name} />
                <h3>{user.name}</h3>
            </div>
            <div className='navbar-sidebar-items'>

                <span className="title">My Account</span>

                <Link to="/account/me">
                    <p>
                        <InfoIcon />
                        Personal Information
                    </p>
                </Link>

                <Link to="/account/update/password">
                    <p>
                        <ChangeCircleIcon />
                        Change Password
                    </p>
                </Link>

                <Link to="/orders">
                    <p>
                        <HistoryIcon />
                        Order History
                    </p>
                </Link>

            </div>
            <div className='navbar-sidebar-items'>
                <span className="title">Dashboard</span>
                <Link to="/admin/dashboard">
                    <p>
                        <DashboardIcon />
                        Analytics
                    </p>
                </Link>
                <div>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ImportExportIcon />}
                    >
                        <TreeItem nodeId="1" label="Products">
                            <Link to="/admin/products">
                                <TreeItem
                                    nodeId="2"
                                    label="All"
                                    icon={<PostAddIcon />}
                                />
                            </Link>

                            <Link to="/admin/product">
                                <TreeItem
                                    nodeId="3"
                                    label="Create"
                                    icon={<AddIcon />}
                                />
                            </Link>
                        </TreeItem>
                    </TreeView>
                </div>
                <Link to={'/admin/orders'}>
                    <p>
                        <ListAltIcon />
                        Orders
                    </p>
                </Link>
                <Link to={'/admin/users'}>
                    <p>
                        <PeopleIcon />
                        Users
                    </p>
                </Link>
                <Link to={'/admin/reviews'}>
                    <p>
                        <RateReviewIcon />
                        Reviews
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default ProfileMenu