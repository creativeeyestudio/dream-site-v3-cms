'use client' // ⚠️ Obligatoire (Client Component)

import React, { useEffect, useMemo, useState } from 'react'
import { Select, useConfig } from '@payloadcms/ui' // Nouveau chemin v3

const STORAGE_KEY = 'selectedSiteId'

export default function SiteSelector() {
  // Le client‑config sérialisé est exposé par useConfig
  const {
    config: { serverURL },
  } = useConfig()

  const [sites, setSites] = useState<any[]>([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    setSelected(localStorage.getItem(STORAGE_KEY) || '')

    fetch(`${serverURL}/api/settings?limit=100`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setSites(data.docs ?? []))
  }, [serverURL])

  const options = useMemo(
    () => [
      { label: 'Sélectionner un site…', value: '' },
      ...sites.map((s) => ({
        label: s?.websiteConfigGroup?.title || s?.nom || s?.domain,
        value: s?.id,
      })),
    ],
    [sites],
  )

  const selectedOption = options.find((o) => o.value === selected) || options[0]

  const onChange = (opt: { label: string; value: string } | null) => {
    const id = opt?.value ?? ''
    setSelected(id)
    localStorage.setItem(STORAGE_KEY, id)
    location.reload() // ou mise à jour via contexte
  }

  return (
    <div style={{ width: '100%', marginTop: 10, marginBottom: 20 }}>
      <Select
        name="selectedSite"
        label="Site sélectionné"
        value={selectedOption} /* 👈 objet complet */
        options={options}
        onChange={onChange} /* 👈 reçoit objet */
      />
    </div>
  )
}
