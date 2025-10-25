"use client";

import React, { useState, useEffect, useCallback, useMemo, memo, forwardRef, useImperativeHandle } from "react";
import {
  Search as SearchIcon,
  Close,
  ChevronRight,
  DocumentAdd,
  Folder,
  Dashboard,
  Task,
  User as UserIcon,
  Settings as SettingsIcon,
} from "@carbon/icons-react";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  badge?: string;
}

const FAKE_SEARCH_DATA: SearchItem[] = [
  {
    id: "1",
    title: "Dashboard",
    description: "View your main dashboard",
    category: "Pages",
    icon: <Dashboard size={16} />,
  },
  {
    id: "2",
    title: "Tasks",
    description: "Manage your tasks and projects",
    category: "Pages",
    icon: <Task size={16} />,
  },
  {
    id: "3",
    title: "Documents",
    description: "Browse all documents",
    category: "Pages",
    icon: <DocumentAdd size={16} />,
  },
  {
    id: "4",
    title: "Projects",
    description: "View all projects",
    category: "Pages",
    icon: <Folder size={16} />,
  },
  {
    id: "5",
    title: "Profile Settings",
    description: "Manage your profile and preferences",
    category: "Settings",
    icon: <UserIcon size={16} />,
  },
  {
    id: "6",
    title: "Application Settings",
    description: "Configure application settings",
    category: "Settings",
    icon: <SettingsIcon size={16} />,
  },
  {
    id: "7",
    title: "Create New Document",
    description: "Start a new document",
    category: "Actions",
    icon: <DocumentAdd size={16} />,
    badge: "⌘N",
  },
  {
    id: "8",
    title: "Create New Task",
    description: "Add a new task",
    category: "Actions",
    icon: <Task size={16} />,
    badge: "⌘T",
  },
  {
    id: "9",
    title: "Quick Search Files",
    description: "Search through all files",
    category: "Pages",
    icon: <SearchIcon size={16} />,
  },
  {
    id: "10",
    title: "Archive Project",
    description: "Move project to archive",
    category: "Actions",
    icon: <Folder size={16} />,
  },
];

interface CommandPaletteHandle {
  open: () => void;
  close: () => void;
}

const CommandPalette = memo(forwardRef<CommandPaletteHandle, {}>(function CommandPalette(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return FAKE_SEARCH_DATA;

    const query = searchQuery.toLowerCase();
    return FAKE_SEARCH_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: SearchItem[] } = {};

    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });

    return Object.entries(groups).map(([category, items]) => ({
      category,
      items,
    }));
  }, [filteredItems]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      // Close on Escape
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery("");
        setSelectedIndex(0);
      }

      // Navigate with arrow keys
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const totalItems = filteredItems.length;
          setSelectedIndex((prev) => (prev + 1) % totalItems);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const totalItems = filteredItems.length;
          setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredItems.length > 0) {
            handleSelectItem(filteredItems[selectedIndex]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const handleSelectItem = useCallback((item: SearchItem) => {
    console.log("Selected:", item);
    setIsOpen(false);
    setSearchQuery("");
    setSelectedIndex(0);
    // Add your navigation logic here
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-16"
      onClick={() => {
        setIsOpen(false);
        setSearchQuery("");
        setSelectedIndex(0);
      }}
    >
      <div
        className="w-full max-w-2xl bg-black rounded-lg shadow-2xl border border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="border-b border-neutral-800 p-4">
          <div className="flex items-center gap-3">
            <SearchIcon size={18} className="text-neutral-500 shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search pages, settings, and actions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="flex-1 bg-transparent text-neutral-100 placeholder-neutral-600 outline-none text-sm"
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setSearchQuery("");
                setSelectedIndex(0);
              }}
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <Close size={16} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-neutral-500 text-sm">No results found</p>
            </div>
          ) : (
            groupedItems.map((group, groupIndex) => (
              <div key={group.category}>
                <div className="px-4 py-2 text-xs font-semibold text-neutral-600 uppercase tracking-wider bg-neutral-900 sticky top-0">
                  {group.category}
                </div>
                {group.items.map((item, itemIndex) => {
                  const globalIndex = filteredItems.findIndex(
                    (i) => i.id === item.id
                  );
                  const isSelected = globalIndex === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`px-4 py-3 cursor-pointer transition-colors border-l-2 flex items-center gap-3 ${
                        isSelected
                          ? "bg-neutral-900 border-l-blue-600"
                          : "bg-black border-l-transparent hover:bg-neutral-900"
                      }`}
                    >
                      <div className="text-neutral-500">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-100 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-neutral-600 truncate">
                          {item.description}
                        </p>
                      </div>
                      {item.badge && (
                        <span className="text-xs text-neutral-600 whitespace-nowrap">
                          {item.badge}
                        </span>
                      )}
                      {isSelected && (
                        <ChevronRight
                          size={16}
                          className="text-neutral-500 shrink-0"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 px-4 py-3 bg-neutral-900 text-xs text-neutral-600 flex items-center justify-between">
          <div className="flex gap-3">
            <span>
              <span className="text-neutral-500">↑↓</span> Navigate
            </span>
            <span>
              <span className="text-neutral-500">⏎</span> Select
            </span>
            <span>
              <span className="text-neutral-500">Esc</span> Close
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #404040;
        }
      `}</style>
    </div>
  );
}));

export default CommandPalette;
