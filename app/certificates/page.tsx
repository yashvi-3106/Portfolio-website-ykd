"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Award, Calendar, ExternalLink, Download } from "lucide-react"

const certificates = [
  {
    id: 1,
    title: "Simplilearn Certificate 1",
    issuer: "Simplilearn",
    date: "",
    image: "/placeholder.svg",
    description: "View certificate on Simplilearn",
    credentialId: "",
    verificationUrl: "https://simpli-web.app.link/e/rigRhCNDTWb",
  },
  {
    id: 2,
    title: "Simplilearn Certificate 2",
    issuer: "Simplilearn",
    date: "",
    image: "/placeholder.svg",
    description: "View certificate on Simplilearn",
    credentialId: "",
    verificationUrl: "https://simpli-web.app.link/e/hklX0VJDTWb",
  },
  {
    id: 3,
    title: "Simplilearn Certificate 3",
    issuer: "Simplilearn",
    date: "",
    image: "/placeholder.svg",
    description: "View certificate on Simplilearn",
    credentialId: "",
    verificationUrl: "https://simpli-web.app.link/e/woZHgCWDTWb",
  },
  {
    id: 4,
    title: "Simplilearn Certificate 4",
    issuer: "Simplilearn",
    date: "",
    image: "/placeholder.svg",
    description: "View certificate on Simplilearn",
    credentialId: "",
    verificationUrl: "https://simpli-web.app.link/e/6e4azh8DTWb",
  },
  {
    id: 5,
    title: "Simplilearn Certificate 5",
    issuer: "Simplilearn",
    date: "",
    image: "/placeholder.svg",
    description: "View certificate on Simplilearn",
    credentialId: "",
    verificationUrl: "https://simpli-web.app.link/e/yLMQ57lETWb",
  },
  {
    id: 6,
    title: "Simplilearn Certificate 6",
    issuer: "Simplilearn",
    date: "",
    image: "/placeholder.svg",
    description: "View certificate on Simplilearn",
    credentialId: "",
    verificationUrl: "https://simpli-web.app.link/e/LPwKTFnETWb",
  },
]

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[0] | null>(null)

  const openModal = (certificate: (typeof certificates)[0]) => {
    setSelectedCertificate(certificate)
  }

  const closeModal = () => {
    setSelectedCertificate(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary">Certificates</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise in various technologies and
            platforms.
          </p>
        </div>

        {/* Certificates Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {certificates.map((certificate, index) => (
            <div
              key={certificate.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(certificate)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={certificate.image || "/placeholder.svg"}
                  alt={certificate.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground p-2 rounded-full">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {certificate.title}
                </h3>
                <p className="text-primary font-medium mb-2">{certificate.issuer}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{certificate.date}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{certificate.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">{selectedCertificate.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Certificate Image */}
                  <div className="space-y-4">
                    <Image
                      src={selectedCertificate.image || "/placeholder.svg"}
                      alt={selectedCertificate.title}
                      width={500}
                      height={400}
                      className="w-full rounded-lg shadow-lg"
                    />
                    <div className="flex space-x-3">
                      <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <a
                        href={selectedCertificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-card border border-border text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Verify</span>
                      </a>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Certificate Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Issuing Organization</label>
                          <p className="text-foreground font-medium">{selectedCertificate.issuer}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Issue Date</label>
                          <p className="text-foreground font-medium">{selectedCertificate.date}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Credential ID</label>
                          <p className="text-foreground font-medium font-mono text-sm">
                            {selectedCertificate.credentialId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Description</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedCertificate.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Skills Validated</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.title.includes("AWS") && (
                          <>
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">AWS</span>
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                              Cloud Computing
                            </span>
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                              Serverless
                            </span>
                          </>
                        )}
                        {selectedCertificate.title.includes("Google Cloud") && (
                          <>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">GCP</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              Cloud Architecture
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Kubernetes</span>
                          </>
                        )}
                        {selectedCertificate.title.includes("MongoDB") && (
                          <>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">MongoDB</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">NoSQL</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                              Database Design
                            </span>
                          </>
                        )}
                        {selectedCertificate.title.includes("React") && (
                          <>
                            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">React</span>
                            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">JavaScript</span>
                            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">
                              Frontend Development
                            </span>
                          </>
                        )}
                        {selectedCertificate.title.includes("TypeScript") && (
                          <>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">TypeScript</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              Type Safety
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              Advanced Types
                            </span>
                          </>
                        )}
                        {selectedCertificate.title.includes("Docker") && (
                          <>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Docker</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              Containerization
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">DevOps</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
