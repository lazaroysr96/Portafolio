import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const timelineData = [
  {
    year: "Agosto 2025",
    title: "Full Stack Developer",
    company: "FacturaGPT",
    description:
      "Desarrollo de un módulo de agente de inteligencia artificial para automatizar la edición de contenido multimedia.",
    type: "work",
  },
  {
    year: "Julio 2025",
    title: "SYSGD",
    company: "SYSGD-Ecosystem",
    description:
      "Desarrollo de una plataforma web para la gestión de proyectos colaborativos utilizando React y Node.js.",
    type: "project",
  },
  {
    year: "Abril 2025",
    title: "Funcionario de Atención a Tareas de la Economía",
    company: "CDR Municipal de Jesús Menéndez",
    description:
      "Atención a las tareas de la economía en los CDR municipales de Jesús Menéndez.",
    type: "work",
  },
  {
    year: "Febrero 2025",
    title: "Curso de Preparación para Reserva de Cuadros",
    company: "Escuela Provincial del Partido en Las Tunas",
    description:
      "Curso de preparación para cuadros profesionales en la reserva.",
    type: "education",
  },
  {
    year: "Agosto 2024",
    title: "Técnico en Gestión Documental",
    company: "UEB Preparación y Construcción de Parques Eólicos",
    description:
      "Atención al área de Informática, Comunicaciones y Gestión Documental.",
    type: "work",
  },
  {
    year: "Enero 2023",
    title: "Técnico en Automatización",
    company: "UEB Preparación y Construcción de Parques Eólicos",
    description:
      "Atención al área de Informática, Comunicaciones y Gestión Documental.",
    type: "work",
  },
  {
    year: "Octubre 2023",
    title: "Técnico A en Gestión de Recursos Humanos",
    company: "UEB Preparación y Construcción de Parques Eólicos",
    description:
      "Atención al área de Seguridad y Salud Laboral, gestión de documentación y apoyo en procesos administrativos.",
    type: "work",
  },
  {
    year: "Febrero 2023 - Junio 2025",
    title: "Frontend Developer",
    company: "Freelance",
    description:
      "Desarrollo de aplicaciones web responsivas utilizando React, Tailwind CSS y TypeScript. Participación en el desarrollo de Mirage, una plataforma de chat impulsada por el protocolo Matrix, Bóveda Cripto y varios proyectos relacionados con la blockchain.",
    type: "work",
  },
  {
    year: "2024",
    title: "Licenciatura en Contabilidad y Finanzas",
    company: "Universidad de Las Tunas",
    description: "Graduado en Licenciatura en Contabilidad y Finanzas.",
    type: "education",
  },
];


export function Timeline() {
	const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const observers = itemRefs.current.map((ref, index) => {
			if (!ref) return null;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setVisibleItems((prev) => new Set(prev).add(index));
						}
					});
				},
				{ threshold: 0.2 },
			);

			observer.observe(ref);
			return observer;
		});

		return () => {
			observers.forEach((observer) => observer?.disconnect());
		};
	}, []);

	const getTypeColor = (type: string) => {
		switch (type) {
			case "work":
				return "bg-primary";
			case "project":
				return "bg-accent";
			case "education":
				return "bg-chart-3";
			default:
				return "bg-muted";
		}
	};

	const getTypeLabel = (type: string) => {
		switch (type) {
			case "work":
				return "Trabajo";
			case "project":
				return "Proyecto";
			case "education":
				return "Educación";
			default:
				return type;
		}
	};

	return (
		<section
			id="timeline"
			className="relative min-h-screen bg-background px-4 py-24"
		>
			<div className="mx-auto max-w-4xl">
				<h2 className="mb-16 text-balance text-center text-4xl font-bold text-foreground md:text-5xl">
					Mi Trayectoria
				</h2>

				<div className="relative">
					<div className="absolute left-8 top-0 h-full w-0.5 bg-border md:left-1/2" />

					<div className="space-y-12">
						{timelineData.map((item, index) => (
							<div
								key={index}
								ref={(el) => {
									itemRefs.current[index] = el;
								}}
								className={`relative transition-all duration-700 ${
									visibleItems.has(index)
										? "translate-y-0 opacity-100"
										: "translate-y-10 opacity-0"
								}`}
							>
								<div
									className={`flex flex-col gap-8 md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
								>
									<div className="flex-1 pl-20 md:pl-0">
										<Card
											className={`group relative overflow-hidden border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10 ${
												index % 2 === 0 ? "md:mr-12" : "md:ml-12"
											}`}
										>
											<div className="mb-3 flex items-center gap-3">
												<span
													className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeColor(
														item.type,
													)} text-primary-foreground`}
												>
													{getTypeLabel(item.type)}
												</span>
												<span className="font-mono text-sm text-muted-foreground">
													{item.year}
												</span>
											</div>
											<h3 className="mb-2 text-xl font-bold text-card-foreground">
												{item.title}
											</h3>
											<p className="mb-3 text-sm font-medium text-primary">
												{item.company}
											</p>
											<p className="text-pretty text-sm leading-relaxed text-muted-foreground">
												{item.description}
											</p>
										</Card>
									</div>

									<div className="absolute left-8 flex h-8 w-8 items-center justify-center md:left-1/2 md:-translate-x-1/2">
										<div
											className={`h-4 w-4 rounded-full border-4 border-background ${getTypeColor(
												item.type,
											)} shadow-lg transition-transform ${visibleItems.has(index) ? "scale-100" : "scale-0"}`}
										/>
									</div>

									<div className="hidden flex-1 md:block" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
