// // All Projects Page JavaScript
// document.addEventListener('DOMContentLoaded', function() {
//     // Elements
//     const projectCards = document.querySelectorAll('.project-card');
//     const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
//     const clearFiltersButton = document.querySelector('.clear-filters');

//     // Filter state
//     let activeFilters = {
//         tool: [],
//         technique: [],
//         industry: []
//     };

//     // Apply filters
//     function applyFilters() {
//         projectCards.forEach(card => {
//             // Get card data attributes
//             const cardTools = card.dataset.tools ? card.dataset.tools.split(',') : [];
//             const cardTechniques = card.dataset.techniques ? card.dataset.techniques.split(',') : [];
//             const cardIndustry = card.dataset.industry ? card.dataset.industry.split(',') : [];

//             // Check if card matches all active filters
//             let shouldShow = true;

//             // If any tool filters are active, check if card has at least one of those tools
//             if (activeFilters.tool.length > 0) {
//                 shouldShow = activeFilters.tool.some(tool => cardTools.includes(tool));
//             }

//             // If card should still be shown and technique filters are active, check if card has at least one of those techniques
//             if (shouldShow && activeFilters.technique.length > 0) {
//                 shouldShow = activeFilters.technique.some(technique => cardTechniques.includes(technique));
//             }

//             // If card should still be shown and industry filters are active, check if card has at least one of those industries
//             if (shouldShow && activeFilters.industry.length > 0) {
//                 shouldShow = activeFilters.industry.some(industry => cardIndustry.includes(industry));
//             }

//             // Show or hide card based on filter results
//             if (shouldShow) {
//                 card.classList.remove('filtered-out');
//             } else {
//                 card.classList.add('filtered-out');
//             }
//         });
//     }

//     // Update active filters when checkboxes change
//     filterCheckboxes.forEach(checkbox => {
//         checkbox.addEventListener('change', function() {
//             const filterType = this.name; // 'tool', 'technique', or 'industry'
//             const filterValue = this.value;

//             if (this.checked) {
//                 // Add filter to active filters
//                 activeFilters[filterType].push(filterValue);
//             } else {
//                 // Remove filter from active filters
//                 const index = activeFilters[filterType].indexOf(filterValue);
//                 if (index !== -1) {
//                     activeFilters[filterType].splice(index, 1);
//                 }
//             }

//             // Apply the updated filters
//             applyFilters();
//         });
//     });

//     // Clear all filters
//     clearFiltersButton.addEventListener('click', function() {
//         // Uncheck all checkboxes
//         filterCheckboxes.forEach(checkbox => {
//             checkbox.checked = false;
//         });

//         // Reset active filters
//         activeFilters = {
//             tool: [],
//             technique: [],
//             industry: []
//         };

//         // Show all projects
//         projectCards.forEach(card => {
//             card.classList.remove('filtered-out');
//         });
//     });
// });

// All Projects Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Elements
    const projectCards = document.querySelectorAll('.project-card');
    const toolFilter = document.getElementById('tool-filter');
    const techniqueFilter = document.getElementById('technique-filter');
    const industryFilter = document.getElementById('industry-filter');
    const clearFiltersButton = document.querySelector('.clear-filters');

    // Collect all unique filter values
    const tools = new Set();
    const techniques = new Set();
    const industries = new Set();
    
    // Populate sets with unique values from data attributes
    projectCards.forEach(card => {
        const cardTools = card.dataset.tools ? card.dataset.tools.split(',') : [];
        const cardTechniques = card.dataset.techniques ? card.dataset.techniques.split(',') : [];
        const cardIndustries = card.dataset.industry ? card.dataset.industry.split(',') : [];
        
        cardTools.forEach(tool => tools.add(tool));
        cardTechniques.forEach(technique => techniques.add(technique));
        cardIndustries.forEach(industry => industries.add(industry));
    });
    
    // Function to populate a dropdown with options
    function populateDropdown(dropdown, values) {
        // Clear existing options except the "All" option
        while (dropdown.options.length > 1) {
            dropdown.remove(1);
        }
        
        // Add options for the values
        values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            dropdown.appendChild(option);
        });
    }
    
    // Populate the dropdowns
    populateDropdown(toolFilter, tools);
    populateDropdown(techniqueFilter, techniques);
    populateDropdown(industryFilter, industries);

    // Filter state
    let activeFilters = {
        tool: [],
        technique: [],
        industry: []
    };

    // Apply filters
    function applyFilters() {
        projectCards.forEach(card => {
            // Get card data attributes
            const cardTools = card.dataset.tools ? card.dataset.tools.split(',') : [];
            const cardTechniques = card.dataset.techniques ? card.dataset.techniques.split(',') : [];
            const cardIndustries = card.dataset.industry ? card.dataset.industry.split(',') : [];

            // Check if card matches all active filters
            let shouldShow = true;

            // If any tool filter is active, check if card has that tool
            if (activeFilters.tool.length > 0) {
                shouldShow = activeFilters.tool.some(tool => cardTools.includes(tool));
            }

            // If card should still be shown and technique filter is active, check if card has that technique
            if (shouldShow && activeFilters.technique.length > 0) {
                shouldShow = activeFilters.technique.some(technique => cardTechniques.includes(technique));
            }

            // If card should still be shown and industry filter is active, check if card has that industry
            if (shouldShow && activeFilters.industry.length > 0) {
                shouldShow = activeFilters.industry.some(industry => cardIndustries.includes(industry));
            }

            // Show or hide card based on filter results
            if (shouldShow) {
                card.classList.remove('filtered-out');
            } else {
                card.classList.add('filtered-out');
            }
        });
    }

    // Update active filters when dropdowns change
    toolFilter.addEventListener('change', function() {
        activeFilters.tool = this.value ? [this.value] : [];
        applyFilters();
    });
    
    techniqueFilter.addEventListener('change', function() {
        activeFilters.technique = this.value ? [this.value] : [];
            applyFilters();
        });
    
    industryFilter.addEventListener('change', function() {
        activeFilters.industry = this.value ? [this.value] : [];
        applyFilters();
    });

    // Clear all filters
    clearFiltersButton.addEventListener('click', function() {
        // Reset all dropdowns to default
        toolFilter.selectedIndex = 0;
        techniqueFilter.selectedIndex = 0;
        industryFilter.selectedIndex = 0;

        // Reset active filters
        activeFilters = {
            tool: [],
            technique: [],
            industry: []
        };

        // Show all projects
        projectCards.forEach(card => {
            card.classList.remove('filtered-out');
        });
    });
});