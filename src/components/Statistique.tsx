import type { FC } from "react";

type StatusStat = {
	label: string;
	value: number;
	color: string;
	delta: string;
};
type DailyTrend = { day: string; shipped: number; delivered: number };
type CityStat = { city: string; volume: number; lateRate: number };

const statusStats: StatusStat[] = [
	{
		label: "Livrés",
		value: 742,
		color: "bg-emerald-500",
		delta: "+4% cette semaine",
	},
	{
		label: "En transit",
		value: 412,
		color: "bg-amber-500",
		delta: "−2% vs hier",
	},
	{
		label: "En attente pickup",
		value: 138,
		color: "bg-sky-500",
		delta: "+9 nouveaux",
	},
	{ label: "Retournés", value: 54, color: "bg-rose-500", delta: "stable" },
];

const dailyTrend: DailyTrend[] = [
	{ day: "Lun", shipped: 210, delivered: 180 },
	{ day: "Mar", shipped: 240, delivered: 196 },
	{ day: "Mer", shipped: 260, delivered: 205 },
	{ day: "Jeu", shipped: 230, delivered: 210 },
	{ day: "Ven", shipped: 250, delivered: 222 },
	{ day: "Sam", shipped: 180, delivered: 162 },
	{ day: "Dim", shipped: 140, delivered: 118 },
];

const cityStats: CityStat[] = [
	{ city: "Alger", volume: 312, lateRate: 3.2 },
	{ city: "Oran", volume: 198, lateRate: 4.6 },
	{ city: "Constantine", volume: 156, lateRate: 2.1 },
	{ city: "Annaba", volume: 121, lateRate: 5.4 },
];

const totalParcels = statusStats.reduce((t, s) => t + s.value, 0);

function StatCard({ stat }: { stat: StatusStat }) {
	return (
		<div className="bg-white/90 rounded-2xl p-4 shadow-md">
			<div className="flex justify-between items-center">
				<p className="text-sm font-semibold text-slate-500">{stat.label}</p>
				<span
					className={`${stat.color} rounded-full inline-block w-3 h-3`}
				></span>
			</div>
			<p className="text-2xl font-bold text-slate-900 mt-3">{stat.value}</p>
			<p className="text-xs font-medium text-slate-500">{stat.delta}</p>
		</div>
	);
}

function TrendBar({ day }: { day: DailyTrend }) {
	const maxValue = 280;
	return (
		<div className="flex flex-col gap-1 text-xs font-medium text-slate-700">
			<div className="flex justify-between">
				<span>{day.day}</span>
				<span className="text-slate-400">{day.delivered} livrés</span>
			</div>
			<div className="flex gap-1 h-3 rounded-full bg-slate-100 p-[2px]">
				<div
					className="bg-emerald-500 rounded-full transition-all"
					style={{ width: `${(day.delivered / maxValue) * 100}%` }}
				></div>
				<div
					className="bg-slate-300 rounded-full transition-all"
					style={{ width: `${(day.shipped / maxValue) * 100}%` }}
				></div>
			</div>
		</div>
	);
}

const PageStatistique: FC = () => {
	return (
		<div className="absolute w-full min-h-screen bg-gray-200/70 font-sans">
			<div className="max-w-[1200px] mx-auto p-6">
				<header className="mb-6">
					<p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
						Tableau de bord
					</p>
					<div className="flex justify-between items-end">
						<h1 className="text-3xl font-bold text-slate-900">
							Statistiques des opérations logistiques
						</h1>
						<div>
							<p className="text-sm text-slate-500">Total colis suivis</p>
							<strong className="text-xl text-slate-900">{totalParcels}</strong>
						</div>
					</div>
				</header>

				<section className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
					{statusStats.map((s) => (
						<StatCard key={s.label} stat={s} />
					))}
				</section>

				<section className="mt-8 space-y-4">
					<div className="bg-white/90 rounded-2xl p-4 shadow-md space-y-2">
						<h2 className="text-lg font-semibold">Volume quotidien</h2>
						{dailyTrend.map((d) => (
							<TrendBar key={d.day} day={d} />
						))}
					</div>

					<div className="bg-white/90 rounded-2xl p-4 shadow-md space-y-3">
						<h2 className="text-lg font-semibold">Taux de incidents</h2>
						{cityStats.map((c) => (
							<div
								key={c.city}
								className="border border-slate-100 rounded-2xl p-3"
							>
								<div className="flex justify-between font-semibold text-slate-800 text-sm">
									<span>{c.city}</span>
									<span>{c.volume} colis</span>
								</div>
								<div className="h-2 rounded-full bg-slate-100 mt-1">
									<div
										className="h-full rounded-full bg-rose-500"
										style={{ width: `${c.lateRate * 12}%` }}
									></div>
								</div>
								<span className="text-xs text-slate-400">
									{c.lateRate}% en retard
								</span>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default PageStatistique;
