import { Link } from "react-router-dom";
import { FiClock, FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";

const contactMethods = [
	{
		title: "Call Our Team",
		detail: "+94 71 234 5678",
		description: "Speak with us for product recommendations, order updates, or urgent support.",
		icon: FiPhoneCall,
		href: "tel:+94712345678",
		linkLabel: "Call now",
	},
	{
		title: "Email Support",
		detail: "support@isuricomputers.lk",
		description: "Send us your questions and we will respond with practical guidance.",
		icon: FiMail,
		href: "mailto:support@isuricomputers.lk",
		linkLabel: "Send email",
	},
	{
		title: "Visit Our Store",
		detail: "123 Main Street, Colombo",
		description: "Drop by to compare devices, accessories, and upgrade options in person.",
		icon: FiMapPin,
		href: "https://maps.google.com",
		linkLabel: "Open map",
	},
];

const supportHours = [
	{ day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
	{ day: "Saturday", time: "9:30 AM - 5:30 PM" },
	{ day: "Sunday", time: "10:00 AM - 2:00 PM" },
];

const serviceAreas = ["Product advice", "Order tracking", "Warranty support", "Bulk purchases"];

export default function ContactUsPage() {
	return (
		<main className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary">
			<section className="relative overflow-hidden">
				<img
					src="/background.jpg"
					alt="Customer support workspace"
					className="absolute inset-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-secondary/75" />

				<div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20 md:px-10 lg:py-24">
					<p className="w-fit rounded-full border border-white/40 px-4 py-1 text-sm font-medium tracking-wider text-white/90">
						CONTACT ISURI COMPUTERS
					</p>
					<h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
						Reach our team for product advice, order help, and after-sales support.
					</h1>
					<p className="max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
						Whether you need the right laptop for work, a fast answer about an order, or help choosing
						accessories, we keep communication clear and practical.
					</p>
					<div className="mt-2 flex flex-wrap gap-3">
						<a
							href="tel:+94712345678"
							className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
						>
							Call Support
						</a>
						<Link
							to="/products"
							className="rounded-md border border-white/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
						>
							Browse Products
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:py-16">
				<div className="grid gap-5 md:grid-cols-3">
					{contactMethods.map((item) => {
						const Icon = item.icon;

						return (
							<article
								key={item.title}
								className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-secondary/10"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white">
									<Icon size={22} />
								</div>
								<h2 className="mt-5 text-xl font-bold">{item.title}</h2>
								<p className="mt-2 text-base font-semibold text-accent">{item.detail}</p>
								<p className="mt-3 text-sm leading-relaxed text-secondary/80">{item.description}</p>
								<a
									href={item.href}
									target={item.href.startsWith("http") ? "_blank" : undefined}
									rel={item.href.startsWith("http") ? "noreferrer" : undefined}
									className="mt-5 inline-flex text-sm font-semibold text-secondary underline underline-offset-4"
								>
									{item.linkLabel}
								</a>
							</article>
						);
					})}
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 pb-12 md:px-10 lg:pb-16">

				<div className="flex flex-col gap-6 md:max-w-xl">
					<article className="rounded-2xl bg-secondary p-6 text-white shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
								<FiClock size={20} />
							</div>
							<h2 className="text-xl font-bold">Support Hours</h2>
						</div>
						<div className="mt-6 space-y-4">
							{supportHours.map((item) => (
								<div key={item.day} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm">
									<span className="text-white/80">{item.day}</span>
									<span className="font-semibold">{item.time}</span>
								</div>
							))}
						</div>
					</article>

					<article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-secondary/10">
						<h2 className="text-xl font-bold">We can help with</h2>
						<div className="mt-5 flex flex-wrap gap-3">
							{serviceAreas.map((item) => (
								<span
									key={item}
									className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-secondary"
								>
									{item}
								</span>
							))}
						</div>
						<p className="mt-5 text-sm leading-relaxed text-secondary/80">
							If you are shopping for a full setup, include your budget and intended use so we can give a more
							useful recommendation.
						</p>
					</article>
				</div>
			</section>
		</main>
	);
}
