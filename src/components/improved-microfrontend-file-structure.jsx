"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, ShoppingCart, Search, Menu, ChevronRight, ChevronDown, Folder, FileJson, FileCode } from 'lucide-react'

const sharedPackages = [
  { id: 'p1', name: 'Header.jsx', type: 'layout', icon: FileCode, bg: 'bg-gray-700' },
  { id: 'p2', name: 'Footer.jsx', type: 'layout', icon: FileCode, bg: 'bg-gray-700' },
  { id: 'p3', name: 'Navigation.jsx', type: 'layout', icon: FileCode, bg: 'bg-gray-600' },
  { id: 'p4', name: 'Button.jsx', type: 'ui', icon: FileCode, bg: 'bg-gray-500' },
  { id: 'p5', name: 'Input.jsx', type: 'ui', icon: FileCode, bg: 'bg-gray-500' },
  { id: 'p6', name: 'Card.jsx', type: 'ui', icon: FileCode, bg: 'bg-gray-500' },
]

const apps = [
  {
    name: 'UserDashboard',
    color: 'blue',
    components: [
      { id: 'ud1', name: 'ProfileSummary.jsx', icon: FileCode, bg: 'bg-blue-800' },
      { id: 'ud2', name: 'ActivityFeed.jsx', icon: FileCode, bg: 'bg-blue-700' },
      { id: 'ud3', name: 'QuickActions.jsx', icon: FileCode, bg: 'bg-blue-600' },
      { id: 'ud4', name: 'StatsOverview.jsx', icon: FileCode, bg: 'bg-blue-500' },
      { id: 'ud5', name: 'page.jsx', icon: FileCode, bg: 'bg-blue-900' },
    ]
  },
  {
    name: 'ProductCatalog',
    color: 'green',
    components: [
      { id: 'pc1', name: 'ProductGrid.jsx', icon: FileCode, bg: 'bg-green-800' },
      { id: 'pc2', name: 'SearchBar.jsx', icon: FileCode, bg: 'bg-green-700' },
      { id: 'pc3', name: 'FilterPanel.jsx', icon: FileCode, bg: 'bg-green-600' },
      { id: 'pc4', name: 'page.jsx', icon: FileCode, bg: 'bg-green-900' },
    ]
  },
  {
    name: 'ShoppingCart',
    color: 'yellow',
    components: [
      { id: 'sc1', name: 'CartItems.jsx', icon: FileCode, bg: 'bg-yellow-800' },
      { id: 'sc2', name: 'OrderSummary.jsx', icon: FileCode, bg: 'bg-yellow-700' },
      { id: 'sc3', name: 'CheckoutSteps.jsx', icon: FileCode, bg: 'bg-yellow-600' },
      { id: 'sc4', name: 'page.jsx', icon: FileCode, bg: 'bg-yellow-900' },
    ]
  },
]

const FileTreeItem = ({ item, depth = 0, onSelect, onToggle, color }) => {
  const isFolder = Array.isArray(item.children)
  const Icon = item.icon || (isFolder ? Folder : FileCode)

  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 hover:bg-opacity-20 hover:bg-${color}-200 cursor-pointer text-${color}-100 ${depth === 0 ? 'text-sm' : 'text-xs'} ${item.bg || ''}`}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
        onClick={() => {
          if (isFolder) {
            onToggle(item.id)
          } else {
            onSelect(item)
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
            <FileTreeItem key={child.id} item={child} depth={depth + 1} onSelect={onSelect} onToggle={onToggle} color={color} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Component() {
  const [selectedApp, setSelectedApp] = useState(apps[0])
  const [selectedPage, setSelectedPage] = useState('Home')
  const [fileStructure, setFileStructure] = useState([
    {
      id: 'packages',
      name: 'packages',
      icon: Folder,
      isOpen: false,
      children: [
        { id: 'shared-components', name: 'components', icon: Folder, isOpen: false, children: sharedPackages },
        { id: 'shared-config', name: 'config.json', icon: FileJson, bg: 'bg-gray-600' },
      ]
    },
    {
      id: 'apps',
      name: 'apps',
      icon: Folder,
      isOpen: false,
      children: apps.map(app => ({
        id: app.name,
        name: app.name,
        icon: Folder,
        isOpen: false,
        bg: `bg-${app.color}-900`,
        children: [
          { id: `${app.name}-components`, name: 'components', icon: Folder, isOpen: false, children: app.components },
          { id: `${app.name}-config`, name: 'config.json', icon: FileJson, bg: `bg-${app.color}-600` },
        ]
      }))
    }
  ])

  const handleSelect = (item) => {
    if (item.name === 'page.jsx') {
      const app = apps.find(a => a.components.some(c => c.id === item.id))
      if (app) {
        setSelectedApp(app)
        setSelectedPage('Home')
      }
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

  const renderContent = () => {
    switch (selectedPage) {
      case 'Home':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome to {selectedApp.name}</h2>
            <p>This is the home page of the {selectedApp.name} microfrontend.</p>
            {selectedApp.name === 'UserDashboard' && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-blue-800">
                  <CardHeader>
                    <CardTitle>Profile Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>User profile information goes here.</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-600">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">Edit Profile</Button>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">View Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {selectedApp.name === 'ProductCatalog' && (
              <div>
                <Input placeholder="Search products..." className="mb-4 bg-green-700" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((product) => (
                    <Card key={product} className="bg-green-800">
                      <CardHeader>
                        <CardTitle>Product {product}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Description for Product {product}</p>
                        <Button className="mt-2 bg-green-500 hover:bg-green-600">View Details</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {selectedApp.name === 'ShoppingCart' && (
              <div className="space-y-4">
                <Card className="bg-yellow-800">
                  <CardHeader>
                    <CardTitle>Your Cart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Cart items will be displayed here.</p>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-700">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Order total and checkout button will be here.</p>
                    <Button className="mt-2 bg-yellow-500 hover:bg-yellow-600">Proceed to Checkout</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )
      case 'Products':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((product) => (
                <Card key={product} className={`bg-${selectedApp.color}-800`}>
                  <CardHeader>
                    <CardTitle>Product {product}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Description for Product {product}</p>
                    <Button className={`mt-2 bg-${selectedApp.color}-500 hover:bg-${selectedApp.color}-600`}>Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case 'About':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About Us</h2>
            <p>We are a microfrontend-based application showcasing the power of modular architecture.</p>
          </div>
        )
      case 'Contact':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <form className="space-y-4">
              <Input placeholder="Your Name" className={`bg-${selectedApp.color}-700`} />
              <Input placeholder="Your Email" className={`bg-${selectedApp.color}-700`} />
              <textarea className={`w-full p-2 border rounded bg-${selectedApp.color}-700`} placeholder="Your Message"></textarea>
              <Button className={`bg-${selectedApp.color}-500 hover:bg-${selectedApp.color}-600`}>Send Message</Button>
            </form>
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
          />
        ))}
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Microfrontend Architecture Illustration</h1>
        <div className={`bg-${selectedApp.color}-900 bg-opacity-20 p-4 rounded-lg`}>
          <h2 className="text-xl font-semibold mb-4">Assembled Application: {selectedApp.name}</h2>
          <div className={`bg-${selectedApp.color}-950 rounded-lg shadow-lg overflow-hidden`} style={{ height: '600px', position: 'relative' }}>
            <div className="absolute inset-0 p-4">
              {/* Header */}
              <div className={`bg-${selectedApp.color}-800 h-16 mb-4 rounded-lg flex items-center justify-between px-4`}>
                <div className="flex items-center space-x-4">
                  <Menu size={24} />
                  <span className="text-lg font-bold">{selectedApp.name} Logo</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Bell size={24} />
                  <ShoppingCart size={24} />
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Navigation */}
              <div className={`bg-${selectedApp.color}-700 h-12 mb-4 rounded-lg flex items-center justify-center space-x-4 px-4`}>
                <Button variant="ghost" onClick={() => setSelectedPage('Home')} className={`text-${selectedApp.color}-100 hover:bg-${selectedApp.color}-600`}>Home</Button>
                <Button variant="ghost" onClick={() => setSelectedPage('Products')} className={`text-${selectedApp.color}-100 hover:bg-${selectedApp.color}-600`}>Products</Button>
                <Button variant="ghost" onClick={() => setSelectedPage('About')} className={`text-${selectedApp.color}-100 hover:bg-${selectedApp.color}-600`}>About</Button>
                <Button variant="ghost" onClick={() => setSelectedPage('Contact')} className={`text-${selectedApp.color}-100 hover:bg-${selectedApp.color}-600`}>Contact</Button>
              </div>

              {/* Main Content Area */}
              <div className={`bg-${selectedApp.color}-800 bg-opacity-50 rounded-lg p-4 h-[calc(100%-7rem)] overflow-auto`}>
                {renderContent()}
              </div>
            </div>

            {/* Footer */}
            <div className={`absolute bottom-0 left-0 right-0 bg-${selectedApp.color}-800 h-12 flex items-center justify-between px-4`}>
              <span>© 2023 {selectedApp.name}</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}