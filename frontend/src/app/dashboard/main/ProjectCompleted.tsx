import React from 'react'
import { ChevronDown } from 'lucide-react'

type TeamMember = {
  name: string
  workload: number
}

const teamMembers: TeamMember[] = [
  { name: 'Sam', workload: 7 },
  { name: 'Meldy', workload: 8 },
  { name: 'Ken', workload: 2 },
  { name: 'Dmitry', workload: 10 },
  { name: 'Vego', workload: 8 },
  { name: 'Kadin', workload: 2 },
  { name: 'Melm', workload: 4 },
]

const MAX_WORKLOAD = 10

export default function ProjectsWorkload() {
  return (
    <div className="bg-[#f7f3f0] p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Projects Workload</h2>
        <div className="relative">
          <select className="appearance-none bg-white border rounded-full py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline">
            <option>Last 3 months</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex flex-col-reverse mb-2">
              {[...Array(MAX_WORKLOAD)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-gray-300 mb-1 ${
                    i < member.workload ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  {i === member.workload - 1 && (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      {String(member.workload).padStart(2, '0')}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}