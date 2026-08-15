export const sampleBookId = 'family'
export const sampleAccountId = 'mbank'
export const sampleValuationAccountId = 'trade-republic'
export const sampleReserveId = 'tax'
export const sampleTransactionId = 'groceries'
export const sampleCategoryId = 'groceries'
export const sampleCounterpartyId = 'biedronka'

export const bookHref = (bookId: string) => ({
	pathname: '/books/[book-id]' as const,
	params: { 'book-id': bookId }
})

export const activityHref = (bookId: string) => ({
	pathname: '/books/[book-id]/activity' as const,
	params: { 'book-id': bookId }
})

export const reservesHref = (bookId: string) => ({
	pathname: '/books/[book-id]/reserves' as const,
	params: { 'book-id': bookId }
})

export const moreHref = (bookId: string) => ({
	pathname: '/books/[book-id]/more' as const,
	params: { 'book-id': bookId }
})

export const accountsHref = (bookId: string) => ({
	pathname: '/books/[book-id]/accounts' as const,
	params: { 'book-id': bookId }
})

export const accountHref = (bookId: string, id: string) => ({
	pathname: '/books/[book-id]/accounts/[id]' as const,
	params: { 'book-id': bookId, id }
})

export const transactionHref = (bookId: string, id: string) => ({
	pathname: '/books/[book-id]/transactions/[id]' as const,
	params: { 'book-id': bookId, id }
})

export const reserveHref = (bookId: string, id: string) => ({
	pathname: '/books/[book-id]/reserves/[id]' as const,
	params: { 'book-id': bookId, id }
})
