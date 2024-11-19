
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './CheckoutSteps.css'
import { Typography } from '@mui/material';
const CheckoutSteps = ({ activeStep }) => {
	const steps = [
		{
			label: <Typography>Shipping Address</Typography>,
			icon: <LocalShippingIcon />
		},
		{
			label: <Typography>Confirmation</Typography>,
			icon: <LibraryAddCheckIcon />
		},
		{
			label: <Typography>Payment Info</Typography>,
			icon: <AccountBalanceIcon />
		}
	]

	const stepStyle = {
		boxSizing: "border-box",
		padding: "2.25rem 0 0 0",
		width: "50%",
		margin: "auto"
	}
	return (
		<Stepper activeStep={activeStep} alternativeLabel style={stepStyle}>
			{steps.map((item, index) => (
				<Step
					key={index}
					active={activeStep === index}
					completed={activeStep >= index}
				>
					<StepLabel
						style={{
							color: activeStep >= index ? "var(--color-primary)" : "rgba(0,0,0,0.5)"
						}}
						icon={item.icon}>{item.label}</StepLabel>
				</Step>
			))}
		</Stepper>

	)
}

export default CheckoutSteps