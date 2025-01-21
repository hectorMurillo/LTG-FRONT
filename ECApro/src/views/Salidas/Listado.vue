<template>
	<div>
		<div>
			<!-- <button type="button" class="btn btn-primary" @click="toggleModal">Abrir Modal</button> -->
			<div ref="modal" class="modal fade" :class="{ show, 'd-block': active }" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Información de salida <span
									style="color:red;text-transform: uppercase;">{{
										rowSelected.NombreCandidato }}</span></h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"
								@click="toggleModal">
								<span aria-hidden="true">[X]</span>
							</button>
						</div>
						<div class="modal-body">
							<pdf :src="base64PDF" />
						</div>
						<div class="modal-footer">
							<!-- <button type="button" :class="classBtnRevisado()" @click="saveChangesRevisado(rowSelected)"
								:disabled="rowSelected.Revisado">
								<span v-if="!rowSelected.Revisado">Cambiar a revisado</span>
								<span v-if="rowSelected.Revisado">Revisado <i class="far fa-check-square"></i></span>
							</button> -->
							<button type="button" class="btn btn-sm btn-outline-primary" @click="toggleModal">
								Cerrar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div v-if="active" class="modal-backdrop fade show"></div>
		</div>
		<base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
			<!-- if want cards like dashboard -->
			<div class="row"></div>
		</base-header>
		<div class="container-fluid mt--7">
			<div class="row">
				<div class="col-md-12">
					<div class="card shadow">
						<div class="card-header border-0 mb-3">
							<div class="row container">
								<div class="col-12 col-md-5 text-left">
									<h3 class="mb-0">Listado de Salidas </h3>
								</div>
							</div>
							<div class="row">
								<div class="col-xl-6 col-md-6 col-sm-12">
									<div class="mt-3">Busqueda:</div>
									<base-input placeholder="Busqueda" addon-right-icon="fa fa-search" v-upper-case
										v-model="buscando" @keyup.delete="buscando = ''" v-on:keyup="buscar()" />
								</div>
								<div class="col-xl-2 col-md-2 col-sm-4 mt-4">
									<!-- <div class="mt-3"></div> -->
									<base-button v-on:click="agregarSalidaMP()" class="btn-outline-success btn-md">
										<div class="row text-center ml-4">
											<i class="fas fa-plus"></i>
											<i class="fas fa-truck-loading"></i>
										</div>
										<div class="row">
											Salida de M.P.<br> a centros 
										</div>
									</base-button>
								</div>
								<div class="col-xl-2 col-md-2 col-sm-4 mt-4">
									<!-- <div class="mt-3"></div> -->
									<base-button v-on:click="agregarSalidaCajas()" class="btn-outline-success btn-md">
										<div class="row text-center ml-4">
											<i class="fas fa-plus"></i>
											<i class="fas fa-boxes"></i>
										</div>
										<div class="row">
											Salida de <br>Cajas
										</div>
									</base-button>
								</div>
							</div>
						</div>
						<div class="table-responsive table-striped table-hover" v-if="clientes.length != 0">
							<base-table class="table align-items-center table-flush" tbody-classes="list"
								:data="clientes">
								<template slot="columns">
									<th scope="col"></th>
									<th scope="col">FolioRecepcion</th>
									<th scope="col">Folio/Carta</th>
									<th scope="col">Fecha</th>
									<th scope="col">Nombre Lote</th>
									<th scope="col">Proveedor</th>
									<!-- <th scope="col">Redes</th>
									<th scope="col">Revisado / Confirmado</th> -->
								</template>
								<template slot-scope="{ row }">
									<!-- <pre>{{row}}</pre> -->
									<td>
										<!-- <button class="btn btn-outline-primary btn-sm">
															<i class="fas fa-eye"></i>
														</button> -->
										<!-- <button class="btn btn-outline-info btn-sm" @click="toggleModal(row)">
											<i class="fas fa-clipboard-check"></i>
										</button> -->
										<!-- {{ row.folio }} -->
									</td>
									<td class="budget">
										{{ row.idRecepcion }}
									</td>
									<th scope="row">
										<div class="media align-items-center">
											<div class="media-body">
												<span class="name mb-0 text-sm">
													{{ row.folio_carta }}
												</span>
											</div>
										</div>
									</th>
									<td class="budget">
										{{ row.fechaFormat }}
									</td>
									<td class="budget">
										{{ row.NOMBRELOTE }}
									</td>

									<td class="budget">
										<!-- <a :href="'https://wa.me/+52' + row.Celular" target="_blank"><i class="fab fa-whatsapp"></i> {{
											row.Celular }}</a> -->
										{{ row.aliasProveedor }}

									</td>
									<td class="budget">
										<button class="btn btn-outline-info btn-sm"
											@click="mandarAImprimir(row.idRecepcion)">
											<i class="fas fa-download"></i>
										</button>
										<a :href="base64PDF" :download="'rptRecepcion_'+row.folio_carta+'_'+randomId+'.pdf'" id="descargaRpt" style="display: none;"></a>
									</td>
									<pdf v-if="false" :src="base64PDF"></pdf>
									<!-- <td class="budget">
										<a :href="'https://www.facebook.com/' + row.Facebook + '/?app=fbl'
											" target="_blank"><i class="fab fa-facebook"></i></a>
										&nbsp;|&nbsp;
										<a :href="'https://www.instagram.com/' + row.Instagram" target="_blank"><i
												class="fab fa-instagram"></i>
										</a>
									</td>
									<td class="budget">
										<span class="badge rounded-pill bg-danger text-white" v-if="!row.Revisado">Pendiente de
											revisión</span>
										<span class="badge rounded-pill bg-warning text-white"
											v-if="row.Revisado && !row.Confirmado">Pendiente de confirmar</span>
										<span class="badge rounded-pill bg-success text-white"
											v-if="row.Revisado && row.Confirmado">Confirmado</span>
									</td> -->
									<td class="text-left">
										<!-- <b-dropdown
																size="sm"
																toggle-class="text-decoration-none"
																block
																variant="secondary"
																no-caret
														>
																<b-dropdown-item v-on:click="editar(row.uid)">
																		<i class="fas fa-eye"></i>
																		Detalle
																</b-dropdown-item>
																<b-dropdown-item v-on:click="editar(row.uid)">
																		<i class="fas fa-clipboard-list"></i>
																		Seguimiento
																</b-dropdown-item>
														</b-dropdown> -->
									</td>
								</template>
							</base-table>
						</div>
						<div class="card-footer d-flex justify-content-end">
							<!-- <base-pagination
								:page-count="totalPaginas"
								v-model="pagina"
							></base-pagination> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import Swal from 'sweetalert2';
// import { listar, actualizarRevisado, obtenerURLImg } from "../../services/candidatos";
import { listar, generaPDF } from '../../services/recepciones';
import pdf from 'vue-pdf';
// import { buscarByNombre } from "../../services/clientes";
export default {
	name: "clientes",
	components: {
		pdf
	},
	data() {
		return {
			buscando: "",
			clientes: [],
			pagina: 1,
			totalPaginas: 1,
			active: false,
			show: false,
			rowSelected: {},
			imgSelected: "",
			base64PDF: "",
			randomId: ""
		};
	},
	// components:{
	//   Breadcrumbs
	// },
	methods: {
		verImagen(nombreImagen) {
			// this.imgSelected = this.imgSelected == "" ? obtenerURLImg(nombreImagen) : "";
			nombreImagen + "";
		},
		mandarAImprimir(id) {
			this.randomId = (Math.round(Math.random()+1*100*Math.random()+1*623));
			generaPDF(id).then((res) => {
				const base64EncodePDF = res;
				const pdfUrl =  `data:application/pdf;base64,${base64EncodePDF}`;
				this.base64PDF = pdfUrl;
				setTimeout(() => {
					const enlace = document.getElementById('descargaRpt');
					enlace.click();
				}, 1000);
				// window.open(this.base64PDF);
			});
			// this.toggleModal()
		},
		agregarSalidaCajas() {
			this.$router.push({
				name: "salida-cajas",
			});
		},
		agregarSalidaMP(){
			this.$router.push({
				name: "salida-mp",
			});
		},
		agregarRecepcionCentros(){
			this.$router.push({
				name: "recepcion-centros",
			});
		},
		editar(id) {
			this.$router.push({
				name: "recepcion-madera",
				params: { id: id },
			});
		},
		listado() {
			listar().then((res) => {
				this.clientes = res?.data?.length == 0 ? [] : res;
			});
		},
		buscar() {
			if (this.buscando == "") {
				this.listado();
			} else {
				console.log(this.clientes);
				let resultado = this.clientes.filter((cliente) =>
					(
						cliente.NombreProyecto +
						" " +
						cliente.Correo +
						" " +
						cliente.NombreCategoria +
						" " +
						cliente.NombreSubCategoria +
						" " +
						cliente.Celular
					)
						.toUpperCase()
						.includes(this.buscando)
				);
				this.clientes = resultado;
			}
		},
		toggleModal() {
			// this.rowSelected = rowSelected
			const body = document.querySelector("body");
			this.active = !this.active;
			this.imgSelected = "";
			this.active
				? body.classList.add("modal-open")
				: body.classList.remove("modal-open");
			setTimeout(() => (this.show = !this.show), 10);
		},
		/*saveChangesRevisado(row) {
			actualizarRevisado(row.IdCandidatosAColaboradoresEnc).then(res => {
				if (res.resultado[0][0].pResultado) {

					// Swal.fire({
					//     title: "¿ Desea agregar un comentario ?",
					//     input: "text",
					//     inputAttributes: {
					//         autocapitalize: "on"
					//     },
					//     showCancelButton: true,
					//     confirmButtonText: "Confirmar",
					//     showLoaderOnConfirm: true,
					//     preConfirm: async (login) => {
					//         try {
					//         const githubUrl = `
					//             https://api.github.com/users/${login}
					//         `;
					//         const response = await fetch(githubUrl);
					//         if (!response.ok) {
					//             return Swal.showValidationMessage(`
					//             ${JSON.stringify(await response.json())}
					//             `);
					//         }
					//         return response.json();
					//         } catch (error) {
					//         Swal.showValidationMessage(`
					//             Request failed: ${error}
					//         `);
					//         }
					//     },
					//     allowOutsideClick: () => !Swal.isLoading()
					//     }).then((result) => {
					//     if (result.isConfirmed) {
					//         Swal.fire({
					//         title: `${result.value.login}'s avatar`,
					//         imageUrl: result.value.avatar_url
					//         });
					//     }
					// });




					Swal.fire({
						title: '¡ Éxito !',
						// text: JSON.stringify(data, null, 2),
						text: res?.resultado[0][0]?.pMsg,
						icon: 'success',
						confirmButtonText: 'Entendido',
						customClass: {
							// title: 'my-title-class', // Clase CSS para el título
							confirmButton: 'btn-modales' // Clase CSS para el botón de confirmación
						}
					});


				}
				this.toggleModal(this.rowSelected);
				this.listado();
			});
		},*/
		classBtnRevisado() {
			return !this.rowSelected.Revisado ? 'btn btn-sm btn-outline-primary' : 'btn btn-sm btn-outline-warning';
		}
	},
	mounted() {
		this.listado();
	},
};
</script>

<style>
.page-item.active .page-link {
	background-color: #2dce89;
}
</style>
