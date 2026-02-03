import type { Route } from './+types/__.ts'

import { Outlet } from 'react-router'

import { withRequestContext } from '~/lib/mikro-orm/index.ts'

export default function AuthenticatedLayout({ loaderData }: Route.ComponentProps): React.ReactNode {
	return (
		<div className='flex h-full flex-col'>
			<main className='flex-1'>
				<Outlet />
			</main>
		</div>
	)
}

export const loader = withRequestContext(async function loader({ request }: Route.LoaderArgs) {
	return {}
})
