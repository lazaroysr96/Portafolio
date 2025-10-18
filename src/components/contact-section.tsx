import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isValidEmail(formData.email)) {
			alert("Por favor, introduce un correo válido.");
			return;
		}

		setLoading(true);
		setSuccess(false);

		try {
			const res = await fetch("https://sheetdb.io/api/v1/u3qgsi8g6kh4h", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					data: {
						name: formData.name,
						email: formData.email,
						message: formData.message,
						fecha: new Date().toISOString(),
					},
				}),
			});

			if (!res.ok) throw new Error("Error en la conexión");

			setSuccess(true);
			setFormData({ name: "", email: "", message: "" });

			setTimeout(() => setSuccess(false), 5000);
		} catch (error) {
			console.error(error);
			alert("Algo salió mal al enviar tu mensaje. Intenta más tarde.");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const isValidEmail = (email: string) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	return (
		<section
			id="contact"
			className="relative min-h-screen bg-background px-4 py-24"
		>
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-16 text-center text-4xl font-bold text-foreground md:text-5xl">
					Hablemos
				</h2>

				<div className="grid gap-8 md:grid-cols-2">
					{/* Formulario de contacto */}
					<Card className="border-border bg-card/50 p-8 backdrop-blur-sm">
						<h3 className="mb-6 text-2xl font-bold text-card-foreground">
							Envíame un mensaje
						</h3>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="mb-2 block text-sm font-medium text-card-foreground"
								>
									Nombre
								</label>
								<Input
									id="name"
									name="name"
									type="text"
									required
									value={formData.name}
									onChange={handleChange}
									className="bg-background/50"
									placeholder="Tu nombre"
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium text-card-foreground"
								>
									Email
								</label>
								<Input
									id="email"
									name="email"
									type="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="bg-background/50"
									placeholder="tu@email.com"
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="mb-2 block text-sm font-medium text-card-foreground"
								>
									Mensaje
								</label>
								<Textarea
									id="message"
									name="message"
									required
									value={formData.message}
									onChange={handleChange}
									className="min-h-32 bg-background/50"
									placeholder="Cuéntame sobre tu proyecto..."
								/>
							</div>

							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
							>
								{loading ? "Enviando..." : "Enviar mensaje"}
							</Button>

							{success && (
								<p className="text-center text-sm text-green-500 mt-2">
									¡Mensaje enviado con éxito!
								</p>
							)}
						</form>
					</Card>

					{/* Tarjeta de información de contacto */}
					<div className="space-y-6">
						<Card className="border-border bg-card/50 p-8 backdrop-blur-sm">
							<h3 className="mb-6 text-2xl font-bold text-card-foreground">
								Información de contacto
							</h3>
							<div className="space-y-4">
								<div className="flex items-start gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<svg
											className="h-5 w-5 text-primary"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-card-foreground">Email</p>
										<a
											href="mailto:lazaroyunier96@gmail.com"
											className="text-sm text-muted-foreground hover:text-primary"
										>
											lazaroyunier96@gmail.com
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<svg
											className="h-5 w-5 text-primary"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-card-foreground">
											Ubicación
										</p>
										<p className="text-sm text-muted-foreground">
											Jesús Menéndez, Cuba
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<svg
											className="h-5 w-5 text-primary"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-card-foreground">Teléfono</p>
										<a
											href="tel:+5351158544"
											className="text-sm text-muted-foreground hover:text-primary"
										>
											+53 51158544
										</a>
									</div>
								</div>
							</div>
						</Card>

						<Card className="border-border bg-card/50 p-8 backdrop-blur-sm">
							<h3 className="mb-6 text-xl font-bold text-card-foreground">
								Redes sociales
							</h3>
							<div className="flex gap-4">
								<a
									href="https://github.com/lazaroysr96"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
								>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
								</a>
								<a
									href="https://www.linkedin.com/in/lazaro-yunier-salazar-rodriguez-ba28392b6/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
								>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
								</a>
								<a
									href="https://twitter.com/sanlazarodev"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
								>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
									</svg>
								</a>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
