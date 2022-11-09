/* EXTERNAL */
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
/* INTERNAL */
/* -------- */

class BaseEntity {
	@PrimaryGeneratedColumn()
	public id: string;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	public createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	public updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', default: null, nullable: true })
	public deletedAt: Date;
}
/* -EXPORT- */
export { BaseEntity };
/* -------- */
