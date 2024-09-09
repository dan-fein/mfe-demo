"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Menu, ChevronRight, ChevronDown, Folder, FileCode, Lock, Home, Book, BarChart } from 'lucide-react'

const sharedPackages = [
  { id: 'p1', name: 'Header.jsx', type: 'layout', icon: FileCode, bg: 'bg-gray-700' },
  { id: 'p2', name: 'Footer.jsx', type: 'layout', icon: FileCode, bg: 'bg-gray-600' },
  { id: 'p3', name: 'Navigation.jsx', type: 'layout', icon: FileCode, bg: 'bg-gray-500' },
  { id: 'p4', name: 'Button.jsx', type: 'ui', icon: FileCode, bg: 'bg-gray-400' },
  { id: 'p5', name: 'Input.jsx', type: 'ui', icon: FileCode, bg: 'bg-gray-300' },
  { id: 'p6', name: 'Card.jsx', type: 'ui', icon: FileCode, bg: 'bg-gray-200' },
]

const apps = [
  {
    name: 'Marketing',
    color: 'purple',
    route: '/',
    icon: Home,
    components: [
      { id: 'm1', name: 'Hero.jsx', icon: FileCode, bg: 'bg-purple-900' },
      { id: 'm2', name: 'Features.jsx', icon: FileCode, bg: 'bg-purple-800' },
      { id: 'm3', name: 'Testimonials.jsx', icon: FileCode, bg: 'bg-purple-700' },
      { id: 'm4', name: 'Pricing.jsx', icon: FileCode, bg: 'bg-purple-600' },
      { id: 'm5', name: 'page.jsx', icon: FileCode, bg: 'bg-purple-500' },
    ]
  },
  {
    name: 'Documentation',
    color: 'green',
    route: '/docs',
    icon: Book,
    components: [
      { id: 'd1', name: 'Sidebar.jsx', icon: FileCode, bg: 'bg-green-900' },
      { id: 'd2', name: 'ArticleContent.jsx', icon: FileCode, bg: 'bg-green-800' },
      { id: 'd3', name: 'SearchBar.jsx', icon: FileCode, bg: 'bg-green-700' },
      { id: 'd4', name: 'TableOfContents.jsx', icon: FileCode, bg: 'bg-green-600' },
      { id: 'd5', name: 'page.jsx', icon: FileCode, bg: 'bg-green-500' },
    ]
  },
  {
    name: 'Dashboard',
    color: 'blue',
    route: '/dashboard',
    icon: BarChart,
    components: [
      { id: 'db1', name: 'Overview.jsx', icon: FileCode, bg: 'bg-blue-900' },
      { id: 'db2', name: 'Analytics.jsx', icon: FileCode, bg: 'bg-blue-800' },
      { id: 'db3', name: 'UserProfile.jsx', icon: FileCode, bg: 'bg-blue-700' },
      { id: 'db4', name: 'Settings.jsx', icon: FileCode, bg: 'bg-blue-600' },
      { id: 'db5', name: 'page.jsx', icon: FileCode, bg: 'bg-blue-500' },
    ]
  },
]

const FileTreeItem = ({ item, depth = 0, onSelect, onToggle, color, onNavigate }) => {
  const isFolder = Array.isArray(item.children)
  const Icon = item.icon || (isFolder ? Folder : FileCode)
  const bgClass = item.bg || ''
  const textColorClass = bgClass.includes('-200') || bgClass.includes('-300') || bgClass.includes('-400') ? 'text-gray-800' : 'text-gray-100'

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 hover:bg-opacity-20 hover:bg-${color}-200 cursor-pointer ${textColorClass} ${depth === 0 ? 'text-sm' : 'text-xs'} ${bgClass}`}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
        onMouseEnter={() => onSelect(item)}
        onMouseLeave={() => onSelect(null)}
        onClick={() => {
          if (isFolder) {
            onToggle(item.id)
          } else {
            onNavigate(item)
          }
        }}
      >
        {isFolder && (item.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
        <Icon size={14} className="mr-2" />
        <span>{item.name}</span>
      </div>
      {isFolder && item.isOpen && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem key={child.id} item={child} depth={depth + 1} onSelect={onSelect} onToggle={onToggle} color={color} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  )
}

const SharedButton = ({ children, className = "", ...props }) => (
  <Button className={`bg-gray-400 hover:bg-gray-500 ${className}`} {...props}>
    {children}
  </Button>
)

export default function Component() {
  const [selectedApp, setSelectedApp] = useState(apps[0])
  const [highlightedElements, setHighlightedElements] = useState([])
  const [fileStructure, setFileStructure] = useState([
    {
      id: 'packages',
      name: 'packages',
      icon: Folder,
      isOpen: true,
      children: [
        { id: 'shared-components', name: 'components', icon: Folder, isOpen: true, children: sharedPackages },
      ]
    },
    {
      id: 'apps',
      name: 'apps',
      icon: Folder,
      isOpen: true,
      children: apps.map(app => ({
        id: app.name,
        name: app.name,
        icon: Folder,
        isOpen: true,
        bg: `bg-${app.color}-950`,
        children: [
          { id: `${app.name}-components`, name: 'components', icon: Folder, isOpen: true, children: app.components },
        ]
      }))
    }
  ])

  const handleSelect = (item) => {
    if (item === null) {
      setHighlightedElements([])
    } else if (item.name === 'page.jsx') {
      const app = apps.find(a => a.components.some(c => c.id === item.id))
      if (app) {
        setSelectedApp(app)
      }
      setHighlightedElements([item.id])
    } else if (item.id === 'p4') {
      setHighlightedElements(['p4', 'm3', 'd3', 'db3', 'shared-button'])
    } else if (item.id === 'p1') {
      setHighlightedElements(['p1', 'header'])
    } else if (item.id === 'p2') {
      setHighlightedElements(['p2', 'footer'])
    } else if (item.id === 'p3') {
      setHighlightedElements(['p3', 'navigation'])
    } else {
      setHighlightedElements([item.id])
    }
  }

  const handleToggle = (id) => {
    const toggleFolder = (items) => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, isOpen: !item.isOpen }
        }
        if (item.children) {
          return { ...item, children: toggleFolder(item.children) }
        }
        return item
      })
    }
    setFileStructure(toggleFolder(fileStructure))
  }

  const handleNavigate = (item) => {
    const app = apps.find(a => a.name === item.name || a.components.some(c => c.id === item.id))
    if (app) {
      setSelectedApp(app)
    }
  }

  const renderContent = () => {
    switch (selectedApp.name) {
      case 'Marketing':
        return (
          <div className="space-y-4">
            <motion.div
              animate={highlightedElements.includes('m1') ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-purple-900">
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <h1 className="text-3xl font-bold">Welcome to Our Product</h1>
                  <p className="mt-2">Discover the amazing features that will revolutionize your workflow.</p>
                  <motion.div
                    animate={highlightedElements.includes('shared-button') ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <SharedButton className="mt-4">Get Started</SharedButton>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              animate={highlightedElements.includes('m2') ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-purple-800">
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Intuitive Interface</li>
                    <li>Powerful Analytics</li>
                    <li>Seamless Integration</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              animate={highlightedElements.includes('m3') ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-purple-700">
                <CardHeader>
                  <CardTitle>Testimonials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>"This product has transformed our business!" - Happy Customer</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )
      case 'Documentation':
        return (
          <div className="flex">
            <motion.div
              animate={highlightedElements.includes('d1') ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="w-1/4 pr-4"
            >
              <Card className="bg-green-900">
                <CardHeader>
                  <CardTitle>Sidebar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Getting Started</li>
                    <li>Core Concepts</li>
                    <li>Advanced Topics</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <div className="w-3/4 space-y-4">
              <motion.div
                animate={highlightedElements.includes('d3') ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-green-700">
                  <CardContent className="p-2">
                    <Input placeholder="Search documentation..." className="w-full" />
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                animate={highlightedElements.includes('d2') ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-green-800">
                  <CardHeader>
                    <CardTitle>Article Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h2 className="text-xl font-bold">Getting Started</h2>
                    <p className="mt-2">Learn how to set up and use our product in just a few simple steps.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )
      case 'Dashboard':
        return (
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              animate={highlightedElements.includes('db1') ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="col-span-2"
            >
              <Card className="bg-blue-900">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Welcome back! Here's a summary of your account activity.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              animate={highlightedElements.includes('db2') ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-blue-800">
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your performance metrics and data visualizations.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              animate={highlightedElements.includes('db3') ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-blue-700">
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Manage your account settings and preferences.</p>
                  <motion.div
                    animate={highlightedElements.includes('shared-button') ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <SharedButton className="mt-2">Edit Profile</SharedButton>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-64 bg-gray-800 overflow-auto">
        <div className="p-4 font-bold">Microfrontend Structure</div>
        {fileStructure.map((item) => (
          <FileTreeItem 
            key={item.id} 
            item={item} 
            onSelect={handleSelect} 
            onToggle={handleToggle} 
            color={item.id === 'apps' ? 'gray' : 'blue'}
            onNavigate={handleNavigate}
          />
        ))}
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Microfrontend Architecture Illustration</h1>
        <div className={`bg-${selectedApp.color}-950 bg-opacity-20 p-4 rounded-lg`}>
          <h2 className="text-xl font-semibold mb-4">Assembled Application: {selectedApp.name}</h2>
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden" style={{ height: '600px', position: 'relative' }}>
            {/* Fake Address Bar */}
            <div className="bg-gray-700 p-2 flex items-center">
              <Lock className="text-green-500 mr-2" size={16} />
              <span className="text-sm text-gray-300">https://microfrontend-demo.com</span>
              <span className="text-sm text-gray-100">{selectedApp.route}</span>
            </div>
            <div className="absolute inset-0 pt-10 p-4">
              {/* Header (Shared Component) */}
              <motion.div
                animate={highlightedElements.includes('header') ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gray-700 h-16 mb-4 rounded-lg flex items-center justify-between px-4">
                  <div className="flex items-center space-x-4">
                    <Menu size={24} />
                    <span className="text-lg font-bold">Microfront Demo</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Bell size={24} />
                    <Search size={24} />
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </motion.div>

              {/* Navigation (Shared Component) */}
              <motion.div
                animate={highlightedElements.includes('navigation') ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gray-500 h-12 mb-4 rounded-lg flex items-center justify-center space-x-4 px-4">
                  {apps.map((app) => (
                    <motion.div
                      key={app.name}
                      animate={highlightedElements.includes('shared-button') ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <SharedButton
                        variant="ghost"
                        onClick={() => setSelectedApp(app)}
                        className={`text-${app.color}-100 hover:bg-${app.color}-600 ${selectedApp.name === app.name ? `bg-${app.color}-700` : ''}`}
                      >
                        <app.icon className="mr-2" size={16} />
                        {app.name}
                      </SharedButton>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Main Content Area */}
              <div className={`bg-${selectedApp.color}-950 bg-opacity-50 rounded-lg p-4 h-[calc(100%-7rem)] overflow-auto`}>
                {renderContent()}
              </div>
            </div>

            {/* Footer (Shared Component) */}
            <motion.div
              animate={highlightedElements.includes('footer') ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0"
            >
              <div className="bg-gray-600 h-12 flex items-center justify-between px-4">
                <span>© 2023 Microfrontend Demo</span>
                <div className="flex space-x-4">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                  <a href="#" className="hover:underline">Terms of Service</a>
                  <a href="#" className="hover:underline">Contact Us</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}