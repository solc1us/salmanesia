import { QRCodeSVG } from "qrcode.react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function TicketCard({ registration, event }) {
	const isCheckedIn = registration.checkedInAt !== null;

	return (
		<article className="h-full min-w-0 break-words">
			<Card className="h-full gap-0 overflow-hidden py-0 shadow-none">
				<header className="flex flex-wrap items-start justify-between gap-3 border-b border-teal-100 bg-teal-50 p-5 sm:p-6">
					<h2 className="min-w-0 flex-1 text-lg leading-snug font-semibold text-teal-900">
						{event?.title ?? "Event tidak tersedia"}
					</h2>
					<Badge
						variant={isCheckedIn ? "secondary" : "outline"}
						className={isCheckedIn ? "border-teal-200 bg-teal-100 text-teal-900" : "border-slate-200 bg-white text-slate-700"}
					>
						<span className="sr-only">Status tiket: </span>
						{isCheckedIn ? "Checked In" : "Registered"}
					</Badge>
				</header>
				<CardContent className="flex flex-1 flex-col p-5 sm:p-6">
					<dl className="grid grid-cols-1 gap-5 text-sm leading-relaxed sm:grid-cols-2">
						<div className="min-w-0 sm:col-span-2">
							<dt className="text-slate-600">Nama peserta</dt>
							<dd className="mt-1 font-medium text-slate-900">
								{registration.participantName}
							</dd>
						</div>
						<div>
							<dt className="text-slate-600">Tanggal event</dt>
							<dd className="mt-1 font-medium text-slate-900">
								{event?.date ?? "Tanggal tidak tersedia"}
							</dd>
						</div>
						<div>
							<dt className="text-slate-600">Lokasi event</dt>
							<dd className="mt-1 font-medium text-slate-900">
								{event?.location ?? "Lokasi tidak tersedia"}
							</dd>
						</div>
						<div className="min-w-0 sm:col-span-2">
							<dt className="text-slate-600">Ticket ID</dt>
							<dd className="mt-2 rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 break-all">
								{registration.ticketId}
							</dd>
						</div>
					</dl>
					<div className="mt-6 flex flex-1 items-end justify-center border-t border-dashed border-slate-200 bg-white pt-5">
						<QRCodeSVG
							value={registration.ticketId}
							size={160}
							marginSize={4}
							role="img"
							aria-label={`QR code tiket ${registration.ticketId}`}
							title="QR code tiket"
						/>
					</div>
				</CardContent>
			</Card>
		</article>
	);
}
