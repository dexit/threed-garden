// @mui material components
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ThreeD Garden components
import MDBox from '#/lib/mui/MDBox'
import MDTypography from '#/lib/mui/MDTypography'

// ThreeD Garden examples components
import DashboardLayout from '#/ui/elements/LayoutContainers/DashboardLayout'
import DashboardNavbar from '#/ui/elements/Navbars/DashboardNavbar'
import Footer from '#/ui/elements/Footer'
import DataTable from '#/ui/elements/Tables/DataTable'

// ProductPage page components
import ProductImages from '#/pages/dashboards/ecommerce/products/product-page/components/ProductImages'
import ProductInfo from '#/pages/dashboards/ecommerce/products/product-page/components/ProductInfo'

// Data
import dataTableData from '#/lib/api/@fake-db/pages/dashboards/ecommerce/products/product-page/data/dataTableData'

function ProductPage(): JSX.Element {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mx={1}>
        <Card sx={{ overflow: 'visible' }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography
                variant='h5'
                fontWeight='medium'
              >
                Product Details
              </MDTypography>
            </MDBox>

            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                lg={6}
                xl={6}
              >
                <ProductImages />
              </Grid>
              <Grid
                item
                xs={12}
                lg={5}
                sx={{ mx: 'auto' }}
              >
                <ProductInfo />
              </Grid>
            </Grid>

            <MDBox
              mt={8}
              mb={2}
            >
              <MDBox
                mb={1}
                ml={2}
              >
                <MDTypography
                  variant='h5'
                  fontWeight='medium'
                >
                  Other Products
                </MDTypography>
              </MDBox>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default ProductPage
