import type { MetaDescriptor } from 'react-router'
import type { Route } from './+types/__._index.ts'

import { useState, useMemo } from 'react'
import { DateTime } from 'luxon'
import {
	Plus,
	ArrowRight,
	CalendarIcon,
	ChevronDown,
	Utensils,
	Car,
	Home,
	Tv,
	Briefcase,
	ShoppingCart,
	Fuel,
	Train,
	ArrowUpRight,
	ArrowDownLeft,
	ArrowLeftRight,
	Wallet
} from 'lucide-react'

import { cn } from '~/lib/util/index.ts'
import { Button } from '~/components/shadcn/ui/button.tsx'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent
} from '~/components/shadcn/ui/card.tsx'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetFooter
} from '~/components/shadcn/ui/sheet.tsx'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '~/components/shadcn/ui/dialog.tsx'
import { Input } from '~/components/shadcn/ui/input.tsx'
import { Label } from '~/components/shadcn/ui/label.tsx'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '~/components/shadcn/ui/select.tsx'
import { Badge } from '~/components/shadcn/ui/badge.tsx'
import { Separator } from '~/components/shadcn/ui/separator.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/shadcn/ui/popover.tsx'
import { Calendar } from '~/components/shadcn/ui/calendar.tsx'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '~/components/shadcn/ui/collapsible.tsx'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Currency = 'USD' | 'EUR' | 'PLN' | 'RUB'

type CurrencyConfig = {
	code: Currency
	symbol: string
	locale: string
}

type Category = {
	id: string
	name: string
	parentId?: string
	icon?: React.ComponentType<{ className?: string }>
}

type Account = {
	id: string
	name: string
}

type Payee = {
	id: string
	name: string
}

type ParticipantType = 'account' | 'payee'

type Transaction = {
	id: string
	amount: number
	currency: Currency
	sourceType: ParticipantType
	sourceId: string
	targetType: ParticipantType
	targetId: string
	date: string
	categoryId?: string
	description?: string
}

type Variation = 'clean' | 'compact' | 'minimal'

// ---------------------------------------------------------------------------
// Currency config
// ---------------------------------------------------------------------------

const CURRENCIES: Record<Currency, CurrencyConfig> = {
	USD: { code: 'USD', symbol: '$', locale: 'en-US' },
	EUR: { code: 'EUR', symbol: 'EUR', locale: 'de-DE' },
	PLN: { code: 'PLN', symbol: 'zl', locale: 'pl-PL' },
	RUB: { code: 'RUB', symbol: 'rub.', locale: 'ru-RU' }
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const CATEGORIES: Category[] = [
	{ id: 'cat-food', name: 'Food', icon: Utensils },
	{ id: 'cat-groceries', name: 'Groceries', parentId: 'cat-food', icon: ShoppingCart },
	{ id: 'cat-restaurants', name: 'Restaurants', parentId: 'cat-food', icon: Utensils },
	{ id: 'cat-transport', name: 'Transport', icon: Car },
	{ id: 'cat-gas', name: 'Gas', parentId: 'cat-transport', icon: Fuel },
	{ id: 'cat-transit', name: 'Transit', parentId: 'cat-transport', icon: Train },
	{ id: 'cat-housing', name: 'Housing', icon: Home },
	{ id: 'cat-entertainment', name: 'Entertainment', icon: Tv },
	{ id: 'cat-income', name: 'Income', icon: Briefcase },
	{ id: 'cat-salary', name: 'Salary', parentId: 'cat-income', icon: Briefcase },
	{ id: 'cat-freelance', name: 'Freelance', parentId: 'cat-income', icon: Briefcase }
]

const ACCOUNTS: Account[] = [
	{ id: 'acc-checking', name: 'Checking' },
	{ id: 'acc-savings', name: 'Savings' },
	{ id: 'acc-credit', name: 'Credit Card' }
]

const PAYEES: Payee[] = [
	{ id: 'pay-wholefoods', name: 'Whole Foods' },
	{ id: 'pay-starbucks', name: 'Starbucks' },
	{ id: 'pay-shell', name: 'Shell Gas' },
	{ id: 'pay-netflix', name: 'Netflix' },
	{ id: 'pay-spotify', name: 'Spotify' },
	{ id: 'pay-employer', name: 'Employer Inc.' }
]

function toISODate(dt: DateTime): string {
	return dt.toFormat('yyyy-MM-dd')
}

function buildMockTransactions(): Transaction[] {
	const today = DateTime.now()
	return [
		{
			id: 'tx-1',
			amount: 87.43,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-checking',
			targetType: 'payee',
			targetId: 'pay-wholefoods',
			date: toISODate(today),
			categoryId: 'cat-groceries',
			description: 'Weekly groceries'
		},
		{
			id: 'tx-2',
			amount: 5.75,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-credit',
			targetType: 'payee',
			targetId: 'pay-starbucks',
			date: toISODate(today),
			categoryId: 'cat-restaurants',
			description: 'Morning latte'
		},
		{
			id: 'tx-3',
			amount: 3500.0,
			currency: 'USD',
			sourceType: 'payee',
			sourceId: 'pay-employer',
			targetType: 'account',
			targetId: 'acc-checking',
			date: toISODate(today),
			categoryId: 'cat-salary',
			description: 'Bi-weekly paycheck'
		},
		{
			id: 'tx-4',
			amount: 45.0,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-checking',
			targetType: 'payee',
			targetId: 'pay-shell',
			date: toISODate(today.minus({ days: 1 })),
			categoryId: 'cat-gas'
		},
		{
			id: 'tx-5',
			amount: 15.99,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-credit',
			targetType: 'payee',
			targetId: 'pay-netflix',
			date: toISODate(today.minus({ days: 1 })),
			categoryId: 'cat-entertainment',
			description: 'Monthly subscription'
		},
		{
			id: 'tx-6',
			amount: 500.0,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-checking',
			targetType: 'account',
			targetId: 'acc-savings',
			date: toISODate(today.minus({ days: 2 })),
			description: 'Monthly savings transfer'
		},
		{
			id: 'tx-7',
			amount: 9.99,
			currency: 'EUR',
			sourceType: 'account',
			sourceId: 'acc-credit',
			targetType: 'payee',
			targetId: 'pay-spotify',
			date: toISODate(today.minus({ days: 3 })),
			categoryId: 'cat-entertainment',
			description: 'Premium subscription'
		},
		{
			id: 'tx-8',
			amount: 120.5,
			currency: 'PLN',
			sourceType: 'account',
			sourceId: 'acc-checking',
			targetType: 'payee',
			targetId: 'pay-wholefoods',
			date: toISODate(today.minus({ days: 4 })),
			categoryId: 'cat-groceries',
			description: 'Groceries in Warsaw'
		},
		{
			id: 'tx-9',
			amount: 32.0,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-credit',
			targetType: 'payee',
			targetId: 'pay-starbucks',
			date: toISODate(today.minus({ days: 5 })),
			categoryId: 'cat-restaurants',
			description: 'Coffee beans + pastries'
		},
		{
			id: 'tx-10',
			amount: 1200.0,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-checking',
			targetType: 'payee',
			targetId: 'pay-wholefoods',
			date: toISODate(today.minus({ days: 6 })),
			categoryId: 'cat-housing',
			description: 'Rent payment'
		},
		{
			id: 'tx-11',
			amount: 2500.0,
			currency: 'RUB',
			sourceType: 'payee',
			sourceId: 'pay-employer',
			targetType: 'account',
			targetId: 'acc-checking',
			date: toISODate(today.minus({ days: 7 })),
			categoryId: 'cat-freelance',
			description: 'Freelance project payment'
		},
		{
			id: 'tx-12',
			amount: 62.3,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-checking',
			targetType: 'payee',
			targetId: 'pay-shell',
			date: toISODate(today.minus({ days: 9 })),
			categoryId: 'cat-gas'
		},
		{
			id: 'tx-13',
			amount: 200.0,
			currency: 'EUR',
			sourceType: 'account',
			sourceId: 'acc-savings',
			targetType: 'account',
			targetId: 'acc-checking',
			date: toISODate(today.minus({ days: 10 })),
			description: 'Emergency fund withdrawal'
		},
		{
			id: 'tx-14',
			amount: 18.5,
			currency: 'USD',
			sourceType: 'account',
			sourceId: 'acc-credit',
			targetType: 'payee',
			targetId: 'pay-starbucks',
			date: toISODate(today.minus({ days: 12 })),
			categoryId: 'cat-restaurants'
		},
		{
			id: 'tx-15',
			amount: 3500.0,
			currency: 'USD',
			sourceType: 'payee',
			sourceId: 'pay-employer',
			targetType: 'account',
			targetId: 'acc-checking',
			date: toISODate(today.minus({ days: 14 })),
			categoryId: 'cat-salary',
			description: 'Bi-weekly paycheck'
		}
	]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number, currency: Currency): string {
	const config = CURRENCIES[currency]
	if (currency === 'USD') {
		return new Intl.NumberFormat(config.locale, {
			style: 'currency',
			currency: config.code
		}).format(amount)
	}
	const formatted = new Intl.NumberFormat(config.locale, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount)
	return `${formatted} ${config.symbol}`
}

function getDayDiff(date: string): number {
	const dt = DateTime.fromISO(date)
	const now = DateTime.now()
	return now.startOf('day').diff(dt.startOf('day'), 'days').days
}

function formatDate(date: string): string {
	const diff = getDayDiff(date)
	if (diff === 0) {
		return 'Today'
	}
	if (diff === 1) {
		return 'Yesterday'
	}
	if (diff < 7) {
		return DateTime.fromISO(date).toFormat('EEEE')
	}
	return DateTime.fromISO(date).toFormat('MMM d, yyyy')
}

function getRelativeDateGroup(date: string): string {
	const diff = getDayDiff(date)
	if (diff === 0) {
		return 'Today'
	}
	if (diff === 1) {
		return 'Yesterday'
	}
	if (diff < 7) {
		return 'This Week'
	}
	return DateTime.fromISO(date).toFormat('MMM d, yyyy')
}

function getParticipantName(type: ParticipantType, id: string): string {
	if (type === 'account') {
		return ACCOUNTS.find(a => a.id === id)?.name ?? 'Unknown Account'
	}
	return PAYEES.find(p => p.id === id)?.name ?? 'Unknown Payee'
}

function getCategoryWithParent(categoryId: string): string {
	const category = CATEGORIES.find(c => c.id === categoryId)
	if (!category) {
		return 'Uncategorized'
	}
	if (category.parentId) {
		const parent = CATEGORIES.find(c => c.id === category.parentId)
		if (parent) {
			return `${parent.name} \u203A ${category.name}`
		}
	}
	return category.name
}

function getTransactionType(tx: Transaction): 'expense' | 'income' | 'transfer' {
	if (tx.sourceType === 'account' && tx.targetType === 'payee') {
		return 'expense'
	}
	if (tx.sourceType === 'payee' && tx.targetType === 'account') {
		return 'income'
	}
	return 'transfer'
}

function getTransactionColor(tx: Transaction): string {
	const type = getTransactionType(tx)
	if (type === 'income') {
		return 'text-emerald-600 dark:text-emerald-400'
	}
	if (type === 'expense') {
		return 'text-red-600 dark:text-red-400'
	}
	return 'text-muted-foreground'
}

function getTransactionSign(tx: Transaction): string {
	const type = getTransactionType(tx)
	if (type === 'income') {
		return '+'
	}
	if (type === 'expense') {
		return '\u2212'
	}
	return ''
}

function getCategoryDotColor(categoryId: string | undefined): string {
	if (!categoryId) {
		return 'bg-muted-foreground/50'
	}
	const category = CATEGORIES.find(c => c.id === categoryId)
	const rootId = category?.parentId ?? category?.id
	switch (rootId) {
		case 'cat-food':
			return 'bg-orange-500'
		case 'cat-transport':
			return 'bg-blue-500'
		case 'cat-housing':
			return 'bg-violet-500'
		case 'cat-entertainment':
			return 'bg-pink-500'
		case 'cat-income':
			return 'bg-emerald-500'
		default:
			return 'bg-muted-foreground/50'
	}
}

function getCategoryBgColor(categoryId: string | undefined): string {
	if (!categoryId) {
		return 'bg-muted'
	}
	const category = CATEGORIES.find(c => c.id === categoryId)
	const rootId = category?.parentId ?? category?.id
	switch (rootId) {
		case 'cat-food':
			return 'bg-orange-500/10'
		case 'cat-transport':
			return 'bg-blue-500/10'
		case 'cat-housing':
			return 'bg-violet-500/10'
		case 'cat-entertainment':
			return 'bg-pink-500/10'
		case 'cat-income':
			return 'bg-emerald-500/10'
		default:
			return 'bg-muted'
	}
}

function getDisplayName(tx: Transaction): string {
	const type = getTransactionType(tx)
	if (type === 'expense') {
		return getParticipantName('payee', tx.targetId)
	}
	if (type === 'income') {
		return getParticipantName('payee', tx.sourceId)
	}
	return `${getParticipantName('account', tx.sourceId)} \u2192 ${getParticipantName('account', tx.targetId)}`
}

function getAccountLabel(tx: Transaction): string {
	const type = getTransactionType(tx)
	if (type === 'expense') {
		return getParticipantName('account', tx.sourceId)
	}
	if (type === 'income') {
		return getParticipantName('account', tx.targetId)
	}
	return ''
}

function getTransactionIcon(tx: Transaction): React.ComponentType<{ className?: string }> {
	const type = getTransactionType(tx)
	if (type === 'expense') {
		return ArrowUpRight
	}
	if (type === 'income') {
		return ArrowDownLeft
	}
	return ArrowLeftRight
}

function groupByDate(
	transactions: Transaction[]
): Array<{ label: string; transactions: Transaction[] }> {
	const groups = new Map<string, Transaction[]>()
	const sorted = [...transactions].sort(
		(a, b) => DateTime.fromISO(b.date).toMillis() - DateTime.fromISO(a.date).toMillis()
	)

	for (const tx of sorted) {
		const label = getRelativeDateGroup(tx.date)
		const existing = groups.get(label)
		if (existing) {
			existing.push(tx)
		} else {
			groups.set(label, [tx])
		}
	}

	return Array.from(groups.entries()).map(([label, txs]) => ({ label, transactions: txs }))
}

function getCategoryGroups(): Array<{ parent: Category; children: Category[] }> {
	const parents = CATEGORIES.filter(c => !c.parentId)
	return parents.map(parent => ({
		parent,
		children: CATEGORIES.filter(c => c.parentId === parent.id)
	}))
}

// ---------------------------------------------------------------------------
// Shared Form Components
// ---------------------------------------------------------------------------

function ParticipantSelect({
	label,
	value,
	onValueChange,
	size
}: {
	label: string
	value: string
	onValueChange: (value: string) => void
	size?: 'sm' | 'default'
}) {
	return (
		<div className='grid gap-2'>
			<Label>{label}</Label>
			<Select
				value={value}
				onValueChange={onValueChange}
			>
				<SelectTrigger
					size={size}
					className='w-full'
				>
					<SelectValue placeholder={`Select ${label.toLowerCase()}...`} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Accounts</SelectLabel>
						{ACCOUNTS.map(a => (
							<SelectItem
								key={`account:${a.id}`}
								value={`account:${a.id}`}
							>
								{a.name}
							</SelectItem>
						))}
					</SelectGroup>
					<SelectGroup>
						<SelectLabel>Payees</SelectLabel>
						{PAYEES.map(p => (
							<SelectItem
								key={`payee:${p.id}`}
								value={`payee:${p.id}`}
							>
								{p.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}

function isCurrency(value: string): value is Currency {
	return value in CURRENCIES
}

function CurrencySelect({
	value,
	onValueChange,
	compact
}: {
	value: Currency
	onValueChange: (value: Currency) => void
	compact?: boolean
}) {
	return (
		<Select
			value={value}
			onValueChange={v => {
				if (isCurrency(v)) {
					onValueChange(v)
				}
			}}
		>
			<SelectTrigger
				className={cn(compact ? 'w-20' : 'w-24', 'shrink-0')}
				size={compact ? 'sm' : 'default'}
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{Object.values(CURRENCIES).map(c => (
					<SelectItem
						key={c.code}
						value={c.code}
					>
						{c.symbol}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

function CategorySelect({
	value,
	onValueChange,
	size
}: {
	value: string
	onValueChange: (value: string) => void
	size?: 'sm' | 'default'
}) {
	const groups = getCategoryGroups()
	return (
		<div className='grid gap-2'>
			<Label>Category</Label>
			<Select
				value={value}
				onValueChange={onValueChange}
			>
				<SelectTrigger
					size={size}
					className='w-full'
				>
					<SelectValue placeholder='Select category...' />
				</SelectTrigger>
				<SelectContent>
					{groups.map(g => (
						<SelectGroup key={g.parent.id}>
							<SelectLabel>{g.parent.name}</SelectLabel>
							<SelectItem value={g.parent.id}>{g.parent.name}</SelectItem>
							{g.children.map(child => (
								<SelectItem
									key={child.id}
									value={child.id}
								>
									&nbsp;&nbsp;{child.name}
								</SelectItem>
							))}
						</SelectGroup>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}

function DatePickerField({
	value,
	onChange,
	compact
}: {
	value: Date | undefined
	onChange: (date: Date | undefined) => void
	compact?: boolean
}) {
	return (
		<div className='grid gap-2'>
			<Label>{compact ? 'Date' : 'Date'}</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						size={compact ? 'sm' : 'default'}
						className={cn(
							'w-full justify-start text-left font-normal',
							!value && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className='size-4' />
						{value ? DateTime.fromJSDate(value).toFormat('MMM d, yyyy') : 'Pick a date'}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className='w-auto p-0'
					align='start'
				>
					<Calendar
						mode='single'
						selected={value}
						onSelect={onChange}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}

// ---------------------------------------------------------------------------
// Form state hook
// ---------------------------------------------------------------------------

type FormState = {
	amount: string
	currency: Currency
	source: string
	target: string
	date: Date | undefined
	categoryId: string
	description: string
}

function createInitialForm(): FormState {
	return {
		amount: '',
		currency: 'USD',
		source: '',
		target: '',
		date: new Date(),
		categoryId: '',
		description: ''
	}
}

function parseParticipant(value: string): { type: ParticipantType; id: string } | undefined {
	const [type, id] = value.split(':')
	if ((type === 'account' || type === 'payee') && id) {
		return { type, id }
	}
	return undefined
}

function useTransactionForm(onAdd: (tx: Transaction) => void) {
	const [form, setForm] = useState<FormState>(createInitialForm)

	function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
		setForm(prev => ({ ...prev, [key]: value }))
	}

	function handleSubmit() {
		const parsedAmount = Number.parseFloat(form.amount)
		if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
			return
		}
		const source = parseParticipant(form.source)
		const target = parseParticipant(form.target)
		if (!source || !target || !form.date) {
			return
		}

		const tx: Transaction = {
			id: `tx-${Date.now()}`,
			amount: parsedAmount,
			currency: form.currency,
			sourceType: source.type,
			sourceId: source.id,
			targetType: target.type,
			targetId: target.id,
			date: toISODate(DateTime.fromJSDate(form.date)),
			categoryId: form.categoryId || undefined,
			description: form.description || undefined
		}

		onAdd(tx)
		setForm(createInitialForm())
	}

	return { form, updateField, handleSubmit, resetForm: () => setForm(createInitialForm()) }
}

// ---------------------------------------------------------------------------
// Variation A: Clean (Monarch Money inspired)
// ---------------------------------------------------------------------------

function CleanVariation({
	transactions,
	onAdd
}: {
	transactions: Transaction[]
	onAdd: (tx: Transaction) => void
}) {
	const [sheetOpen, setSheetOpen] = useState(false)
	const { form, updateField, handleSubmit, resetForm } = useTransactionForm(tx => {
		onAdd(tx)
		setSheetOpen(false)
	})
	const groups = useMemo(() => groupByDate(transactions), [transactions])

	return (
		<div className='mx-auto max-w-2xl'>
			{/* Header */}
			<div className='mb-8 flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>Transactions</h1>
					<p className='text-muted-foreground text-sm'>Track and manage your financial activity.</p>
				</div>
				<Button onClick={() => setSheetOpen(true)}>
					<Plus />
					Add Transaction
				</Button>
			</div>

			{/* Transaction list */}
			<div className='space-y-8'>
				{groups.map((group, groupIndex) => (
					<div key={group.label}>
						{groupIndex > 0 && <Separator className='mb-8' />}
						<h2 className='text-muted-foreground mb-4 text-xs font-semibold uppercase tracking-wider'>
							{group.label}
						</h2>
						<div className='space-y-1'>
							{group.transactions.map(tx => {
								const TxIcon = getTransactionIcon(tx)
								const accountLabel = getAccountLabel(tx)
								return (
									<div
										key={tx.id}
										className='hover:bg-muted/50 -mx-3 flex items-center justify-between rounded-lg px-3 py-3 transition-colors'
									>
										<div className='flex min-w-0 flex-1 items-center gap-3'>
											<div
												className={cn(
													'flex size-10 shrink-0 items-center justify-center rounded-full',
													getCategoryBgColor(tx.categoryId)
												)}
											>
												<TxIcon
													className={cn(
														'size-4',
														getTransactionType(tx) === 'income' &&
															'text-emerald-600 dark:text-emerald-400',
														getTransactionType(tx) === 'expense' &&
															'text-red-600 dark:text-red-400',
														getTransactionType(tx) === 'transfer' && 'text-muted-foreground'
													)}
												/>
											</div>
											<div className='min-w-0'>
												<div className='truncate font-medium'>{getDisplayName(tx)}</div>
												<div className='text-muted-foreground min-w-0 truncate text-sm'>
													{accountLabel && (
														<>
															<span>{accountLabel}</span>
															{tx.description && (
																<span className='text-muted-foreground/50'> &middot; </span>
															)}
														</>
													)}
													{tx.description && <span>{tx.description}</span>}
												</div>
											</div>
										</div>
										<div className='ml-3 shrink-0 text-right'>
											<div className={cn('font-semibold tabular-nums', getTransactionColor(tx))}>
												{getTransactionSign(tx)}
												{formatCurrency(tx.amount, tx.currency)}
											</div>
											{tx.categoryId && (
												<div className='text-muted-foreground mt-0.5 text-xs'>
													{getCategoryWithParent(tx.categoryId)}
												</div>
											)}
										</div>
									</div>
								)
							})}
						</div>
					</div>
				))}
			</div>

			{/* Sheet form */}
			<Sheet
				open={sheetOpen}
				onOpenChange={open => {
					setSheetOpen(open)
					if (!open) {
						resetForm()
					}
				}}
			>
				<SheetContent side='right'>
					<SheetHeader>
						<SheetTitle>Add Transaction</SheetTitle>
						<SheetDescription>Record a new income, expense, or transfer.</SheetDescription>
					</SheetHeader>
					<div className='flex flex-1 flex-col gap-4 overflow-y-auto px-4'>
						<div className='grid gap-2'>
							<Label>Amount</Label>
							<div className='flex gap-2'>
								<Input
									type='number'
									placeholder='0.00'
									value={form.amount}
									onChange={e => updateField('amount', e.target.value)}
									className='text-lg font-semibold'
								/>
								<CurrencySelect
									value={form.currency}
									onValueChange={v => updateField('currency', v)}
								/>
							</div>
						</div>
						<ParticipantSelect
							label='From'
							value={form.source}
							onValueChange={v => updateField('source', v)}
						/>
						<ParticipantSelect
							label='To'
							value={form.target}
							onValueChange={v => updateField('target', v)}
						/>
						<DatePickerField
							value={form.date}
							onChange={d => updateField('date', d)}
						/>
						<CategorySelect
							value={form.categoryId}
							onValueChange={v => updateField('categoryId', v)}
						/>
						<div className='grid gap-2'>
							<Label>Description</Label>
							<Input
								placeholder='Optional note...'
								value={form.description}
								onChange={e => updateField('description', e.target.value)}
							/>
						</div>
					</div>
					<SheetFooter>
						<Button
							variant='outline'
							onClick={() => {
								setSheetOpen(false)
								resetForm()
							}}
						>
							Cancel
						</Button>
						<Button onClick={handleSubmit}>Add Transaction</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	)
}

// ---------------------------------------------------------------------------
// Variation B: Compact (Power-user / spreadsheet inspired)
// ---------------------------------------------------------------------------

function CompactVariation({
	transactions,
	onAdd
}: {
	transactions: Transaction[]
	onAdd: (tx: Transaction) => void
}) {
	const { form, updateField, handleSubmit } = useTransactionForm(onAdd)
	const sorted = useMemo(
		() =>
			[...transactions].sort(
				(a, b) => DateTime.fromISO(b.date).toMillis() - DateTime.fromISO(a.date).toMillis()
			),
		[transactions]
	)

	return (
		<div className='flex flex-col gap-6 md:flex-row'>
			{/* Form card */}
			<Card className='w-full shrink-0 md:w-80'>
				<CardHeader>
					<CardTitle>Quick Add</CardTitle>
					<CardDescription>Add a new transaction.</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='grid gap-2'>
						<Label>Amount</Label>
						<div className='flex gap-2'>
							<Input
								type='number'
								placeholder='0.00'
								value={form.amount}
								onChange={e => updateField('amount', e.target.value)}
							/>
							<CurrencySelect
								value={form.currency}
								onValueChange={v => updateField('currency', v)}
								compact
							/>
						</div>
					</div>
					<ParticipantSelect
						label='From'
						value={form.source}
						onValueChange={v => updateField('source', v)}
						size='sm'
					/>
					<ParticipantSelect
						label='To'
						value={form.target}
						onValueChange={v => updateField('target', v)}
						size='sm'
					/>
					<DatePickerField
						value={form.date}
						onChange={d => updateField('date', d)}
						compact
					/>
					<CategorySelect
						value={form.categoryId}
						onValueChange={v => updateField('categoryId', v)}
						size='sm'
					/>
					<div className='grid gap-2'>
						<Label>Description</Label>
						<Input
							placeholder='Optional note...'
							value={form.description}
							onChange={e => updateField('description', e.target.value)}
						/>
					</div>
					<Button
						onClick={handleSubmit}
						className='w-full'
					>
						Add
					</Button>
				</CardContent>
			</Card>

			{/* Transaction list card */}
			<Card className='min-w-0 flex-1'>
				<CardHeader>
					<CardTitle>Transactions</CardTitle>
					<CardDescription>{sorted.length} transactions</CardDescription>
				</CardHeader>
				<CardContent className='p-0'>
					{/* Table */}
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead>
								<tr className='text-muted-foreground border-b text-xs font-medium'>
									<th className='px-6 py-2 text-left font-medium'>Date</th>
									<th className='px-2 py-2 text-left font-medium'>From / To</th>
									<th className='px-2 py-2 text-left font-medium'>Category</th>
									<th className='px-6 py-2 text-right font-medium'>Amount</th>
								</tr>
							</thead>
							<tbody className='divide-y'>
								{sorted.map(tx => (
									<tr
										key={tx.id}
										className='hover:bg-muted/50 text-sm transition-colors'
									>
										<td className='text-muted-foreground whitespace-nowrap px-6 py-2.5 text-xs'>
											{formatDate(tx.date)}
										</td>
										<td className='px-2 py-2.5'>
											<span className='flex items-center gap-1.5 truncate'>
												<span className='truncate'>
													{getParticipantName(tx.sourceType, tx.sourceId)}
												</span>
												<ArrowRight className='text-muted-foreground size-3 shrink-0' />
												<span className='truncate'>
													{getParticipantName(tx.targetType, tx.targetId)}
												</span>
											</span>
										</td>
										<td className='px-2 py-2.5'>
											{tx.categoryId && (
												<Badge
													variant='outline'
													className='text-xs'
												>
													{CATEGORIES.find(c => c.id === tx.categoryId)?.name ?? ''}
												</Badge>
											)}
										</td>
										<td
											className={cn(
												'whitespace-nowrap px-6 py-2.5 text-right font-medium tabular-nums',
												getTransactionColor(tx)
											)}
										>
											{getTransactionSign(tx)}
											{formatCurrency(tx.amount, tx.currency)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// ---------------------------------------------------------------------------
// Variation C: Minimal (Mobile-first / Apple Wallet inspired)
// ---------------------------------------------------------------------------

function MinimalVariation({
	transactions,
	onAdd
}: {
	transactions: Transaction[]
	onAdd: (tx: Transaction) => void
}) {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [detailsOpen, setDetailsOpen] = useState(false)
	const { form, updateField, handleSubmit, resetForm } = useTransactionForm(tx => {
		onAdd(tx)
		setDialogOpen(false)
		setDetailsOpen(false)
	})

	const sorted = useMemo(
		() =>
			[...transactions].sort(
				(a, b) => DateTime.fromISO(b.date).toMillis() - DateTime.fromISO(a.date).toMillis()
			),
		[transactions]
	)

	const totalSpent = useMemo(() => {
		const now = DateTime.now()
		const startOfMonth = now.startOf('month')
		return transactions
			.filter(tx => {
				if (tx.sourceType !== 'account' || tx.targetType !== 'payee') {
					return false
				}
				return DateTime.fromISO(tx.date) >= startOfMonth
			})
			.reduce((sum, tx) => (tx.currency === 'USD' ? sum + tx.amount : sum), 0)
	}, [transactions])

	return (
		<div className='mx-auto max-w-md'>
			{/* Summary card */}
			<Card className='mb-8 border-0 bg-transparent shadow-none'>
				<CardContent className='p-0 text-center'>
					<div className='bg-muted/50 mx-auto mb-3 flex size-12 items-center justify-center rounded-full'>
						<Wallet className='text-muted-foreground size-5' />
					</div>
					<div className='text-muted-foreground mb-1 text-sm font-medium'>
						Spent this month (USD)
					</div>
					<div className='text-4xl font-bold tracking-tight tabular-nums'>
						{formatCurrency(totalSpent, 'USD')}
					</div>
				</CardContent>
			</Card>

			{/* Transaction list */}
			<div className='space-y-0.5'>
				{sorted.map((tx, i) => {
					const prevDate = i > 0 ? sorted[i - 1]?.date : undefined
					const showDateBreak =
						prevDate === undefined ||
						getRelativeDateGroup(tx.date) !== getRelativeDateGroup(prevDate)

					return (
						<div key={tx.id}>
							{showDateBreak && (
								<div
									className={cn(
										'text-muted-foreground pb-2 text-xs font-semibold uppercase tracking-wider',
										i > 0 && 'pt-6'
									)}
								>
									{getRelativeDateGroup(tx.date)}
								</div>
							)}
							<div className='hover:bg-muted/50 -mx-2 flex items-center justify-between rounded-lg px-2 py-3 transition-colors'>
								<div className='flex items-center gap-3'>
									<div
										className={cn(
											'size-2 shrink-0 rounded-full',
											getCategoryDotColor(tx.categoryId)
										)}
									/>
									<div className='min-w-0'>
										<div className='truncate text-sm font-medium'>{getDisplayName(tx)}</div>
										{tx.description && (
											<div className='text-muted-foreground truncate text-xs'>{tx.description}</div>
										)}
									</div>
								</div>
								<div
									className={cn(
										'shrink-0 text-sm font-semibold tabular-nums',
										getTransactionColor(tx)
									)}
								>
									{getTransactionSign(tx)}
									{formatCurrency(tx.amount, tx.currency)}
								</div>
							</div>
						</div>
					)
				})}
			</div>

			{/* FAB */}
			<Button
				size='icon-lg'
				className='fixed right-6 bottom-6 size-14 rounded-full shadow-lg'
				onClick={() => setDialogOpen(true)}
				aria-label='Add transaction'
			>
				<Plus className='size-6' />
			</Button>

			{/* Dialog form */}
			<Dialog
				open={dialogOpen}
				onOpenChange={open => {
					setDialogOpen(open)
					if (!open) {
						resetForm()
						setDetailsOpen(false)
					}
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New Transaction</DialogTitle>
						<DialogDescription>Record a new transaction.</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4'>
						<div className='grid gap-2 text-center'>
							<Input
								type='number'
								placeholder='0.00'
								value={form.amount}
								onChange={e => updateField('amount', e.target.value)}
								className='h-14 text-center text-2xl font-bold'
							/>
							<div className='flex justify-center'>
								<CurrencySelect
									value={form.currency}
									onValueChange={v => updateField('currency', v)}
									compact
								/>
							</div>
						</div>
						<ParticipantSelect
							label='From'
							value={form.source}
							onValueChange={v => updateField('source', v)}
						/>
						<ParticipantSelect
							label='To'
							value={form.target}
							onValueChange={v => updateField('target', v)}
						/>
						<Collapsible
							open={detailsOpen}
							onOpenChange={setDetailsOpen}
						>
							<CollapsibleTrigger asChild>
								<Button
									variant='ghost'
									className='text-muted-foreground w-full justify-between'
								>
									Details
									<ChevronDown
										className={cn('size-4 transition-transform', detailsOpen && 'rotate-180')}
									/>
								</Button>
							</CollapsibleTrigger>
							<CollapsibleContent className='grid gap-4 pt-2'>
								<CategorySelect
									value={form.categoryId}
									onValueChange={v => updateField('categoryId', v)}
								/>
								<div className='grid gap-2'>
									<Label>Description</Label>
									<Input
										placeholder='Optional note...'
										value={form.description}
										onChange={e => updateField('description', e.target.value)}
									/>
								</div>
								<DatePickerField
									value={form.date}
									onChange={d => updateField('date', d)}
								/>
							</CollapsibleContent>
						</Collapsible>
					</div>
					<DialogFooter>
						<Button
							onClick={handleSubmit}
							className='w-full'
						>
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

const VARIATIONS: Array<{ key: Variation; label: string }> = [
	{ key: 'clean', label: 'Clean' },
	{ key: 'compact', label: 'Compact' },
	{ key: 'minimal', label: 'Minimal' }
]

export default function IndexPage(): React.ReactNode {
	const [activeVariation, setActiveVariation] = useState<Variation>('clean')
	const [transactions, setTransactions] = useState<Transaction[]>(buildMockTransactions)

	function handleAddTransaction(tx: Transaction) {
		setTransactions(prev => [tx, ...prev])
	}

	return (
		<div className='container py-8'>
			{/* Variation toggle */}
			<div className='mb-8 flex items-center justify-end'>
				<div className='bg-muted inline-flex items-center gap-0.5 rounded-lg p-1'>
					{VARIATIONS.map(v => (
						<button
							key={v.key}
							type='button'
							onClick={() => setActiveVariation(v.key)}
							aria-pressed={activeVariation === v.key}
							className={cn(
								'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
								activeVariation === v.key
									? 'bg-background text-foreground shadow-sm'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							{v.label}
						</button>
					))}
				</div>
			</div>

			{/* Active variation */}
			{activeVariation === 'clean' && (
				<CleanVariation
					transactions={transactions}
					onAdd={handleAddTransaction}
				/>
			)}
			{activeVariation === 'compact' && (
				<CompactVariation
					transactions={transactions}
					onAdd={handleAddTransaction}
				/>
			)}
			{activeVariation === 'minimal' && (
				<MinimalVariation
					transactions={transactions}
					onAdd={handleAddTransaction}
				/>
			)}
		</div>
	)
}

export function meta(_args: Route.MetaArgs): MetaDescriptor[] {
	const title = 'Transactions \u2022 Budgetly'

	const description =
		'Manage your transactions, track income and expenses, and categorize your spending.'

	return [{ title }, { name: 'description', content: description }]
}
