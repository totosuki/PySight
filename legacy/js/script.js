document.addEventListener('DOMContentLoaded', async () => {
  const root = document.documentElement;
  try {
    const navbarHTML = await (await fetch('/navbar.html')).text();
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
  }
  catch (e) {
    console.error('Navbar load failed', e);
  }

  const toggleBtn  = document.getElementById('darkModeToggle');
  const githubIcon = document.getElementById('githubIcon');

  if (localStorage.getItem('theme') === 'light') {
    root.classList.add('light-mode');
  }

  const updateGithubIcon = () => {
    githubIcon?.setAttribute(
      'src',
      root.classList.contains('light-mode')
        ? '/assets/github-mark-dark.svg'
        : '/assets/github-mark-white.svg'
    );
  };

  toggleBtn?.addEventListener('click', () => {
    const isLight = root.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateGithubIcon();
  });

  updateGithubIcon();

  const statusBar = document.getElementById('status-bar');
  if (statusBar) {
    ['mouseover', 'focusin'].forEach(evt =>
      document.addEventListener(evt, e => {
        const card = e.target.closest('.card[data-desc]');
        statusBar.textContent = card?.dataset.desc ?? '';
      })
    );
  }

  const isExternal = (url) => {
    return url.startsWith('http') && !url.includes(location.hostname);
  };
  
  document.querySelectorAll('.stackedit__right a[href]').forEach(link => {
    if (!link.hasAttribute('target') && isExternal(link.href)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  initializeCopyButtons();
});

function initializeCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre > code');
  
  codeBlocks.forEach((codeBlock) => {
    const preElement = codeBlock.parentElement;
    
    // Skip if already processed or if it's inline code
    if (preElement.closest('.code-container') || preElement.tagName !== 'PRE') {
      return;
    }
    
    const container = document.createElement('div');
    container.className = 'code-container';
    
    preElement.parentNode.insertBefore(container, preElement);
    
    container.appendChild(preElement);
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    copyButton.addEventListener('click', async () => {
      try {
        // Get the text content of the code block
        const codeText = codeBlock.textContent || codeBlock.innerText;
        
        // Use modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(codeText);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = codeText;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.textContent = originalText;
          copyButton.classList.remove('copied');
        }, 2000);
        
      } catch (err) {
        console.error('Failed to copy code: ', err);
        
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Error';
        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 2000);
      }
    });
    
    container.appendChild(copyButton);
  });
}