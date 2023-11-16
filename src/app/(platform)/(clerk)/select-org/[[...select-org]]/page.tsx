import { OrganizationList } from '@clerk/nextjs'

export default function CreateOrganizationPage() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl='/organization/:id'
        afterCreateOrganizationUrl='/organization/:id'
      />
    </div>
  )
}
