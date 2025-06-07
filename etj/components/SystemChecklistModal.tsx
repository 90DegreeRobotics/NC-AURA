import React from 'react';
import { IconXMark } from './Icons';

interface SystemChecklistModalProps {
  checklistContent: string;
  onClose: () => void;
}

const SystemChecklistModal: React.FC<SystemChecklistModalProps> = ({ checklistContent, onClose }) => {
  
  const parseChecklistContent = (content: string): React.ReactNode[] => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentListType: 'ul' | 'ol' | null = null;
    let listItems: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    const flushList = () => {
      if (listItems.length > 0) {
        if (currentListType === 'ul') {
          elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside mb-2 space-y-0.5">{listItems}</ul>);
        } else if (currentListType === 'ol') {
          elements.push(<ol key={`ol-${elements.length}`} className="list-decimal list-inside mb-2 space-y-0.5">{listItems}</ol>);
        }
        listItems = [];
        currentListType = null;
      }
    };
    
    const parseLineForInlineFormatting = (line: string): React.ReactNode => {
      // Basic bold and inline code support
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;

      const boldRegex = /(\*\*|__)(.*?)\1/g;
      const inlineCodeRegex = /`(.*?)`/g;
      
      let tempLine = line;
      
      let match;
      const boldProcessedSegments: (string | React.ReactElement)[] = [];
      lastIndex = 0;
      while((match = boldRegex.exec(tempLine)) !== null) {
        if (match.index > lastIndex) {
          boldProcessedSegments.push(tempLine.substring(lastIndex, match.index));
        }
        boldProcessedSegments.push(<strong key={`strong-${elements.length}-${parts.length}-${match.index}`}>{match[2]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < tempLine.length) {
        boldProcessedSegments.push(tempLine.substring(lastIndex));
      }

      boldProcessedSegments.forEach((segment, segIndex) => {
        if (typeof segment === 'string') {
          lastIndex = 0;
          let s = segment;
          while((match = inlineCodeRegex.exec(s)) !== null) {
            if (match.index > lastIndex) {
              parts.push(s.substring(lastIndex, match.index));
            }
            parts.push(<code key={`code-${elements.length}-${parts.length}-${segIndex}-${match.index}`} className="bg-gray-700 text-rose-300 px-1 py-0.5 rounded text-xs">{match[1]}</code>);
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < s.length) {
            parts.push(s.substring(lastIndex));
          }
        } else {
          parts.push(segment); 
        }
      });


      if (parts.length === 0 && line.length > 0) return line; 
      if (parts.length === 1 && typeof parts[0] === 'string') return parts[0]; 

      return <>{parts}</>;
    };


    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        flushList();
        if (inCodeBlock) {
          elements.push(
            <pre key={`pre-${elements.length}`} className="bg-gray-900 p-2 rounded-md my-2 overflow-x-auto custom-scrollbar">
              <code className={`language-${codeBlockLang || 'bash'} text-sm`}>{codeBlockContent.join('\n')}</code>
            </pre>
          );
          inCodeBlock = false;
          codeBlockContent = [];
          codeBlockLang = '';
        } else {
          inCodeBlock = true;
          codeBlockLang = line.substring(3).trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      if (line.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={`h3-${elements.length}`} className="text-lg font-semibold mt-2 mb-1 text-purple-300">{parseLineForInlineFormatting(line.substring(4))}</h3>);
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={`h2-${elements.length}`} className="text-xl font-bold mt-3 mb-1.5 text-sky-300">{parseLineForInlineFormatting(line.substring(3))}</h2>);
      } else if (line.startsWith('# ')) {
        flushList();
        elements.push(<h1 key={`h1-${elements.length}`} className="text-2xl font-bold mt-4 mb-2 text-pink-400">{parseLineForInlineFormatting(line.substring(2))}</h1>);
      } else if (line.startsWith('* ') || line.startsWith('- ')) {
        if (currentListType !== 'ul') {
          flushList();
          currentListType = 'ul';
        }
        listItems.push(<li key={`li-${elements.length}-${listItems.length}`}>{parseLineForInlineFormatting(line.substring(2))}</li>);
      } else if (line.match(/^(\d+\.|[IVXLCDM]+\.)\s/)) { 
         if (currentListType !== 'ol') {
          flushList();
          currentListType = 'ol';
        }
        listItems.push(<li key={`li-${elements.length}-${listItems.length}`}>{parseLineForInlineFormatting(line.replace(/^(\d+\.|[IVXLCDM]+\.)\s/, ''))}</li>);
      } else if (line.trim() === '') {
        flushList();
      } else {
        flushList();
        elements.push(<p key={`p-${elements.length}`} className="mb-1 text-sm">{parseLineForInlineFormatting(line)}</p>);
      }
    }
    flushList(); 
    if (inCodeBlock) { 
        elements.push(
            <pre key={`pre-${elements.length}`} className="bg-gray-900 p-2 rounded-md my-2 overflow-x-auto custom-scrollbar">
              <code className={`language-${codeBlockLang || 'bash'} text-sm`}>{codeBlockContent.join('\n')}</code>
            </pre>
          );
    }

    return elements;
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-md p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-slate-800 w-full max-w-3xl h-[90vh] max-h-[800px] rounded-lg shadow-2xl flex flex-col border border-slate-700">
        <div className="flex justify-between items-center p-3 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-semibold text-indigo-300">System Development Checklist</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Close checklist"
          >
            <IconXMark className="w-5 h-5" />
          </button>
        </div>
        <div className="p-3 md:p-4 overflow-y-auto custom-scrollbar text-slate-300 flex-grow">
          {parseChecklistContent(checklistContent)}
        </div>
         <div className="p-2 border-t border-slate-700 text-right flex-shrink-0">
            <button
                onClick={onClose}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-md font-semibold transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default SystemChecklistModal;