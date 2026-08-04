import { ScrollViewStyleReset } from 'expo-router/html'
import type { PropsWithChildren } from 'react'

import '@/theme'

export default function RootHtml({ children }: PropsWithChildren) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					content='width=device-width, initial-scale=1'
					name='viewport'
				/>
				<ScrollViewStyleReset />
			</head>
			<body>{children}</body>
		</html>
	)
}
