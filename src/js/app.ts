/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import badAppleVideo from '../media/videos/bad-apple.webm'

class App {
  /**
   * @type {HTMLVideoElement}
   */
  #video: HTMLVideoElement

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas: HTMLCanvasElement

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context: CanvasRenderingContext2D

  /**
   * Constructor
   */
  constructor() {
    this.#initCanvas()
    this.#initVideo()

    this.#playVideo()
  }

  /**
   * Play video
   *
   * @returns {void}
   */
  #playVideo(): void {
    this.#video.play().then(() => {
      this.#run()
    })
  }

  /**
   * Run
   *
   * @returns {void}
   */
  #run(): void {
    this.#clear()

    this.#draw()

    requestAnimationFrame(this.#run.bind(this))
  }

  /**
   * Draw
   *
   * @returns {void}
   */
  #draw(): void {
    this.#context.drawImage(
      this.#video,
      0,
      0,
      this.#canvas.width,
      this.#canvas.height,
    )
  }

  /**
   * Clear
   *
   * @returns {void}
   */
  #clear(): void {
    this.#context.fillStyle = '#fff'
    this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  /**
   * Init video
   *
   * @returns {void}
   */
  #initVideo(): void {
    this.#video = document.createElement('video')
    this.#video.muted = true
    this.#video.src = badAppleVideo

    this.#video.addEventListener('loadeddata', () => {
      this.#canvas.width = this.#video.videoWidth
      this.#canvas.height = this.#video.videoHeight
    })
  }

  /**
   * Init canvas
   *
   * @returns {void}
   */
  #initCanvas(): void {
    this.#canvas = document.createElement('canvas')
    this.#context = this.#canvas.getContext('2d') as CanvasRenderingContext2D

    this.#canvas.style.border = '1px solid #000'
    document.body.appendChild(this.#canvas)
  }
}
new App()
