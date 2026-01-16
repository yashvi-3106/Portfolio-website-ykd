"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Award, Calendar, ExternalLink, Download } from "lucide-react"

const certificates = [
  {
    id: 1,
    title: "Azure Fundamentals",
    issuer: "Simplilearn",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542698/Screenshot_2026-01-16_112124_memztr.png",
    description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    credentialId: "",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzI4IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzODg2NF83NzcwMjQ0MTc0OTMwMDA0MDk1My5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4225%2FAzure%2520Fundamentals%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1530091012537136964&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVN0oNdEz2dvc2j0yyrytKTUstKsrMS49PKsovL04tsnVNSU8FADSlI2g9AAAA",
  },
  {
    id: 2,
    title: "Getting Started with Amazon DocumentDB",
    issuer: "Simplilearn",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542747/Screenshot_2026-01-16_112223_pldguf.png",
    description: "Introduction to Amazon DocumentDB (with MongoDB compatibility), a fast, scalable, highly available, and fully managed document database service.",
    credentialId: "",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDkwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODM1NDQ0Ml83NzcwMjQ0MTc0NzQ3MTMwMzAxMS5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7421%2FGetting%2520Started%2520with%2520Amazon%2520DocumentDB%2520%2528with%2520MongoDB%2520compatibility%2529%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1530091012537136964&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVdysPDc8w8PU2j0yyrytKTUstKsrMS49PKsovL04tsnVNSU8FALQtp849AAAA",
  },
  {
    id: 3,
    title: "Getting Started with Gateway Load Balancer",
    issuer: "Simplilearn",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542782/Screenshot_2026-01-16_112300_zsn1kd.png",
    description: "Overview of Gateway Load Balancer and how it helps you deploy, scale, and manage your third-party virtual appliances.",
    credentialId: "",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NTg2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODUzNjEwN184NzIwNjc4MTc2NTI4MzYyODU2MS5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7526%2FGetting%2520Started%2520with%2520Gateway%2520Load%2520Balancer%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1380895717508203191&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVd80JyfDxC%2FM2j0yyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAj06E3z8AAAA%3D",
  },
  {
    id: 4,
    title: "GitHub Copilot Fundamentals",
    issuer: "Simplilearn",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542822/Screenshot_2026-01-16_112339_zo70re.png",
    description: "Fundamental concepts of GitHub Copilot and how to use it to write code faster and with less work.",
    credentialId: "",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0ODc2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODM3NTEwNF84NzIwNjc4MTc0NzkxMjU1Njc2OC5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7867%2FGitHub%2520Copilot%2520Fundamentals%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1380895717508203191&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVD3FKK3AsN%2FM2j0yyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUA2AYhbz8AAAA%3D",
  },
  {
    id: 5,
    title: "Introduction to the Basics of Azure Services",
    issuer: "Simplilearn",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542858/Screenshot_2026-01-16_112413_sjrfo7.png",
    description: "Introduction to the basics of Azure services, including computing, networking, storage, and databases.",
    credentialId: "",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIyMDEwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODUzNjMxN184ODAyMDk3MTc1MTExODIyMzMxMC5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4621%2FIntroduction%2520to%2520the%2520Basics%2520of%2520Azure%2520Services%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1380895717508203191&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVNzZPr3QqzPAxj0yyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAPEySqT8AAAA%3D",
  },
  {
    id: 6,
    title: "Deep Dive on Container Security",
    issuer: "Simplilearn",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542903/Screenshot_2026-01-16_112458_wavow6.png",
    description: "Deep dive into container security concepts, best practices, and tools to secure your containerized applications.",
    credentialId: "",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDk1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzOTIwNl84ODAyMDk3MTc1MTExMzY5NTQzNy5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7426%2FDeep%2520Dive%2520on%2520Container%2520Security%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1380895717508203191&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVL68qNS3Kz%2FUxj0yyrytKTUstKsrMS49PKsovL04tsnXOAEqmAgBXEnW5PwAAAA%3D%3D",
  },
  {
    id: 7,
    title: "Introduction to C++",
    issuer: "Sololearn",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542956/Screenshot_2026-01-16_112553_y16u2g.png",
    description: "Foundational concepts of C++ programming language.",
    credentialId: "CC-NNDXKENC",
    verificationUrl: "https://www.sololearn.com/certificates/CC-NNDXKENC",
  },
  {
    id: 8,
    title: "Introduction to JavaScript",
    issuer: "Sololearn",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768543014/Screenshot_2026-01-16_112650_s31wom.png",
    description: "Core concepts of JavaScript programming language.",
    credentialId: "CC-FB25QUL9",
    verificationUrl: "https://www.sololearn.com/certificates/CC-FB25QUL9",
  },
  {
    id: 9,
    title: "React (Basic)",
    issuer: "HackerRank",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768543050/Screenshot_2026-01-16_112726_gva5gl.png",
    description: "To clear the assessment, one must have a good understanding of React, including components, props, state, and hooks.",
    credentialId: "2c8d22c1f205",
    verificationUrl: "https://www.hackerrank.com/certificates/2c8d22c1f205",
  },
  {
    id: 10,
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768543156/Screenshot_2026-01-16_112907_itokr3.png",
    description: "It covers basic topics of Data Structures (such as Arrays, Strings) and Algorithms (such as Sorting and Searching).",
    credentialId: "57e33e31e44d",
    verificationUrl: "https://www.hackerrank.com/certificates/371ce3a0d322",
  },
  {
    id: 11,
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768543283/Screenshot_2026-01-16_113110_gp8cir.png",
    description: "It covers topics like Functions, Currying, Hoisting, Scope, Inheritance, Events and Error Handling.",
    credentialId: "371ce3a0d322",
    verificationUrl: "https://www.hackerrank.com/certificates/d7468222ef6f",
  },
  {
    id: 12,
    title: "CSS (Basic)",
    issuer: "HackerRank",
    date: "",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768543105/Screenshot_2026-01-16_112820_rspqsz.png",
    description: "It covers topics like CSS Selectors, Box Model, Positioning, Flexbox, and Grid.",
    credentialId: "d7468222ef6f",
    verificationUrl: "https://www.hackerrank.com/certificates/57e33e31e44d",
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
                      <a
                        href={selectedCertificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Verify Certificate</span>
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
                        {selectedCertificate.date && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Issue Date</label>
                            <p className="text-foreground font-medium">{selectedCertificate.date}</p>
                          </div>
                        )}
                        {selectedCertificate.credentialId && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Credential ID</label>
                            <p className="text-foreground font-medium font-mono text-sm">
                              {selectedCertificate.credentialId}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Description</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedCertificate.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Skills Validated</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.title.includes("Azure") && (
                          <>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900/30 dark:text-blue-200">Azure</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900/30 dark:text-blue-200">Cloud Computing</span>
                          </>
                        )}
                        {selectedCertificate.title.includes("MongoDB") && (
                          <>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full dark:bg-green-900/30 dark:text-green-200">MongoDB</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full dark:bg-green-900/30 dark:text-green-200">Database</span>
                          </>
                        )}
                        {selectedCertificate.title.includes("React") && (
                          <>
                            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full dark:bg-cyan-900/30 dark:text-cyan-200">React</span>
                            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full dark:bg-cyan-900/30 dark:text-cyan-200">Frontend</span>
                          </>
                        )}
                        {selectedCertificate.title.includes("JavaScript") && (
                          <>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full dark:bg-yellow-900/30 dark:text-yellow-200">JavaScript</span>
                          </>
                        )}
                        {selectedCertificate.title.includes("C++") && (
                          <>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full dark:bg-purple-900/30 dark:text-purple-200">C++</span>
                          </>
                        )}
                        {selectedCertificate.title.includes("CSS") && (
                          <>
                            <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full dark:bg-pink-900/30 dark:text-pink-200">CSS</span>
                            <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full dark:bg-pink-900/30 dark:text-pink-200">Design</span>
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
