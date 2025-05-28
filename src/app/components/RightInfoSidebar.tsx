
import React from 'react';

const RightInfoSidebar = () => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Contact info</h3>
      </div>

      {/* Contact Profile */}
      <div className="p-6 text-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl text-gray-400">👤</span>
        </div>
        <h2 className="text-xl font-medium text-gray-900 mb-2">Test El Centro</h2>
        <p className="text-sm text-gray-500 mb-6">+1 234 567 8900</p>
        
        {/* Status */}
        <p className="text-sm text-gray-600 mb-1">last seen today at 11:28 PM</p>
      </div>

      {/* About section */}
      <div className="px-6 py-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-500 mb-3">About</h4>
        <p className="text-sm text-gray-900">Hey there! I am using WhatsApp.</p>
      </div>

      {/* Media section */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-500">Media, links and docs</h4>
          <span className="text-sm text-gray-400">37 {'>'}</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="aspect-square bg-gray-100 rounded"></div>
          <div className="aspect-square bg-gray-100 rounded"></div>
          <div className="aspect-square bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 py-4 border-t border-gray-100 space-y-4">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-900">Starred messages</span>
          <span className="text-sm text-gray-400">{'>'}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-900">Chat lock</span>
          <span className="text-sm text-gray-400">{'>'}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-900">Disappearing messages</span>
          <span className="text-sm text-gray-400">Off {'>'}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-900">Encryption</span>
          <span className="text-sm text-gray-400">{'>'}</span>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="mt-auto px-6 py-4 border-t border-gray-100 space-y-3">
        <button className="w-full text-left py-2 text-sm text-red-500">Block Test El Centro</button>
        <button className="w-full text-left py-2 text-sm text-red-500">Report contact</button>
        <button className="w-full text-left py-2 text-sm text-red-500">Delete chat</button>
      </div>
    </div>
  );
};

export default RightInfoSidebar;
