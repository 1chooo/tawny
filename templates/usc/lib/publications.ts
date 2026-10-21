const sampleBibTexData = `
@inproceedings{wang2024feedback,
  title={Feedback-Driven Automated Whole Bug Report Reproduction for Android Apps},
  author={Wang, Dingbang and Zhao, Yu and Feng, Sidong and Zhang, Zhaoxu and Halfond, William G.J. and Chen, Chunyang and Sun, Xiaoxia and Shi, Jiangfan and Yu, Tingting},
  booktitle={Proceedings of the ACM International Symposium on Software Testing and Analysis (ISSTA 2024)},
  year={2024},
  month={September}
}

@inproceedings{zhang2024mobile,
  title={Mobile Bug Report Reproduction via Global Search on the App UI Model},
  author={Zhang, Zhaoxu and Tawsif, Fazle Mohammed and Ryu, Komei and Yu, Tingting and Halfond, William G.J.},
  booktitle={Proceedings of the ACM on Software Engineering Issue FSE 2024 (PACMSE-FSE 2024)},
  year={2024},
  month={July}
}

@inproceedings{chiou2024automatically,
  title={Automatically Detecting Reflow Accessibility Issues in Responsive Web Pages},
  author={Chiou, Paul T. and Winn, Robert and Alotaibi, Ali S. and Halfond, William G.J.},
  booktitle={IEEE/ACM International Conference on Software Engineering (ICSE 2024)},
  year={2024},
  month={April}
}

@inproceedings{volokh2023automatically,
  title={Automatically Defining Game Action Spaces for Exploration Using Program Analysis},
  author={Volokh, Sasha and Halfond, William G.J.},
  booktitle={Proceedings of the Nineteenth AAAI Conference on Artificial Intelligence and Interactive Digital Entertainment (AIIDE-23)},
  year={2023},
  month={October},
  note={Best Student Paper}
}

@inproceedings{alotaibi2023scaleFix,
  title={ScaleFix: An Automated Repair of UI Scaling Accessibility Issues in Android Applications},
  author={Alotaibi, Ali S. and Chiou, Paul T. and Tawsif, Fazle Mohammed and Halfond, William G.J.},
  booktitle={Proceedings of the 39th IEEE International Conference on Software Maintenance and Evolution (ICSME)},
  year={2023},
  month={October}
}

@inproceedings{abolhassani2023component,
  title={A Component-Sensitive Static Analysis Based Approach for Modeling Intents in Android Apps},
  author={Abolhassani, Negarsadat and Halfond, William G.J.},
  booktitle={Proceedings of the 39th IEEE International Conference on Software Maintenance and Evolution (ICSME)},
  year={2023},
  month={October}
}

@inproceedings{zhang2023automatically,
  title={Automatically Reproducing Android Bug Reports Using Natural Language Processing and Reinforcement Learning},
  author={Zhang, Zhaoxu and Winn, Robert and Zhao, Yu and Yu, Tingting and Halfond, William G.J},
  booktitle={Proceedings of the International Symposium on Software Testing and Analysis (ISSTA 2023)},
  year={2023},
  month={July}
}

@inproceedings{chiou2023detecting,
  title={Detecting Dialog-Related Keyboard Navigation Failures in Web Applications},
  author={Chiou, Paul T. and Alotaibi, Ali S. and Halfond, William G.J.},
  booktitle={IEEE/ACM International Conference on Software Engineering (ICSE 2023)},
  year={2023},
  month={May}
}

@inproceedings{chiou2023bagel,
  title={BAGEL: An Approach to Automatically Detect Navigation-Based Web Accessibility Barriers for Keyboard Users},
  author={Chiou, Paul T. and Alotaibi, Ali S. and Halfond, William G.J.},
  booktitle={ACM CHI Conference on Human Factors in Computing Systems (CHI 2023)},
  year={2023},
  month={April},
  note={Honorable Mention Paper Award}
}
`

export interface Publication {
  id: string
  title: string
  authors: string
  venue: string
  year: string
  month: string
  note?: string
  bibTeX: string
  index: number
}

function extractField(entry: string, fieldName: string): string | null {
  const regex = new RegExp(`${fieldName}\\s*=\\s*{([^}]*)}`, 'i')
  const match = entry.match(regex)
  return match ? match[1].trim() : null
}

function formatAuthors(authors: string): string {
  return authors.replace(/\s+and\s+/g, ', ')
}

export function parsePublications(source = sampleBibTexData): Publication[] {
  const entries = source
    .trim()
    .split('@')
    .filter((entry) => entry.trim().length > 0)

  let index = entries.length
  const publications: Publication[] = []

  entries.forEach((entry) => {
    const typeMatch = entry.match(/^(\w+)\s*{\s*([^,]+),/)
    if (!typeMatch) return

    const [, , id] = typeMatch
    publications.push({
      id,
      title: extractField(entry, 'title') || 'Unknown Title',
      authors: formatAuthors(extractField(entry, 'author') || 'Unknown Authors'),
      venue: extractField(entry, 'booktitle') || extractField(entry, 'journal') || 'Unknown Venue',
      year: extractField(entry, 'year') || 'Unknown Year',
      month: extractField(entry, 'month') || '',
      note: extractField(entry, 'note') || '',
      bibTeX: `@${entry.trim()}`,
      index: index--,
    })
  })

  return publications
}

export function groupByYear(publications: Publication[]): Array<[string, Publication[]]> {
  const byYear: Record<string, Publication[]> = {}

  publications.forEach((publication) => {
    if (!byYear[publication.year]) byYear[publication.year] = []
    byYear[publication.year].push(publication)
  })

  return Object.keys(byYear)
    .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
    .map((year) => [year, byYear[year]])
}
