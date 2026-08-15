import { ActionLink, PrototypeScreen } from '~/components/prototype-ui.tsx'

export default function NotFoundRoute() {
	return (
		<PrototypeScreen
			description='This route is not part of the current click-through.'
			title='Page not found'
		>
			<ActionLink
				href='/'
				label='Return to Budgetly'
			/>
		</PrototypeScreen>
	)
}
