import { Link } from "react-router-dom";

const highlights = [
	{
		title: "Customer-First Support",
		description:
			"We help you choose the right setup for work, gaming, or study with practical guidance.",
	},
	{
		title: "Trusted Hardware",
		description:
			"Our catalog focuses on dependable devices and accessories from brands customers already trust.",
	},
	{
		title: "Fast Local Delivery",
		description:
			"Orders are processed quickly so your upgrade reaches you without unnecessary delays.",
	},
];

const stats = [
	{ label: "Years Serving", value: "8+" },
	{ label: "Happy Customers", value: "5,000+" },
	{ label: "Products Listed", value: "300+" },
	{ label: "Support Response", value: "< 2 hrs" },
];

export default function AboutPage() {
	return (
		<main className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary">
			<section className="relative overflow-hidden">
				<img
					src="/background.jpg"
					alt="Technology workspace"
					className="absolute inset-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-secondary/70" />

				<div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20 md:px-10 lg:py-24">
					<p className="w-fit rounded-full border border-white/40 px-4 py-1 text-sm font-medium tracking-wider text-white/90">
						ABOUT ISURI COMPUTERS
					</p>
					<h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
						Building reliable tech experiences for homes, businesses, and creators.
					</h1>
					<p className="max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
						Isuri Computers was founded to make quality technology more accessible, understandable, and affordable.
						We combine curated products with friendly support so every customer can buy with confidence.
					</p>
					<div className="mt-2 flex flex-wrap gap-3">
						<Link
							to="/products"
							className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
						>
							Explore Products
						</Link>
						<Link
							to="/contact"
							className="rounded-md border border-white/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
						>
							Contact Us
						</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-2 md:px-10 lg:py-16">
				<article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-secondary/10">
					<h2 className="text-2xl font-bold">Our Story</h2>
					<p className="mt-3 leading-relaxed text-secondary/80">
						What started as a small local tech operation has grown into a customer-focused online store.
						From everyday laptops to performance accessories, our goal has stayed the same: deliver real value,
						honest recommendations, and support you can depend on.
					</p>
				</article>
				<article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-secondary/10">
					<h2 className="text-2xl font-bold">Our Mission</h2>
					<p className="mt-3 leading-relaxed text-secondary/80">
						We believe great technology should feel simple. Our mission is to help people and teams find the
						right tools faster, with clear pricing and trusted after-sales assistance.
					</p>
				</article>
			</section>

			<section className="mx-auto max-w-6xl px-6 pb-6 md:px-10">
				<h2 className="text-2xl font-bold md:text-3xl">Why customers choose us</h2>
				<div className="mt-5 grid gap-4 md:grid-cols-3">
					{highlights.map((item) => (
						<article
							key={item.title}
							className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-secondary/10"
						>
							<h3 className="text-lg font-semibold">{item.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-secondary/80">{item.description}</p>
						</article>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 py-12 md:px-10 lg:py-16">
				<div className="grid gap-4 rounded-2xl bg-secondary p-6 md:grid-cols-4 md:p-8">
					{stats.map((item) => (
						<div key={item.label} className="rounded-lg bg-white/10 p-4 text-white backdrop-blur-sm">
							<p className="text-3xl font-extrabold">{item.value}</p>
							<p className="mt-1 text-sm text-white/90">{item.label}</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
