create table if not exists founding_signups (
	email text primary key,
	role text not null check (role in ('owner_dentist', 'office_manager', 'other')),
	practice_size text check (practice_size in ('solo', 'two_to_three_staff', 'four_plus_staff')),
	monthly_software_spend text check (monthly_software_spend in ('under_500', '500_to_1000', '1000_to_2000', 'over_2000', 'not_sure')),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);
